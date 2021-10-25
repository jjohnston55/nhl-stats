import { Button, Col, Collapse, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useDispatch } from "react-redux";

import * as viewActions from "../../../actions/viewActions";

import NHL from "../../../api";

const Team = (props) => {
	const dispatch = useDispatch();
	const team = props.team;

	const time = new Date();

	const [teamStats, setTeamStats] = useState({});
	const [teamRanks, setTeamRanks] = useState({});
	const [leftWing, setLeftWing] = useState([]);
	const [centers, setCenters] = useState([]);
	const [rightWings, setRightWings] = useState([]);
	const [defence, setDefence] = useState([]);
	const [goalies, setGoalies] = useState([]);

	useEffect(() => {
		const api = new NHL();
		const cancelToken = axios.CancelToken.source();
		api.GetTeamRoster(team.id, cancelToken.token).then((data) => {
			const l = [];
			const c = [];
			const r = [];
			const d = [];
			const g = [];
			data.forEach((player) => {
				switch (player.position.code) {
					case "L":
						l.push(player);
						break;
					case "C":
						c.push(player);
						break;
					case "R":
						r.push(player);
						break;
					case "D":
						d.push(player);
						break;
					case "G":
						g.push(player);
						break;
					default:
						break;
				}
			});
			setLeftWing(l);
			setCenters(c);
			setRightWings(r);
			setDefence(d);
			setGoalies(g);
		});
		api.GetTeamStats(team.id, cancelToken.token).then((data) => {
			console.log(data[0].splits[0].stat);
			setTeamStats(data[0].splits[0].stat);
			console.log(data[1].splits[0].stat);
			setTeamRanks(data[1].splits[0].stat);
		});
		return () => {
			cancelToken.cancel();
		};
	}, [team]);

	const handlePlayer = (player) => {
		dispatch(viewActions.changeView("player", player.person.id));
	};

	return (
		<>
			<BrowserView>
				<Row justify='center' gutter={[16, 16]}>
					<Col>
						<h3>Location</h3>
						<h2>{team.locationName}</h2>
					</Col>
					<Col>
						<h3>Team</h3>
						<h2>{team.teamName}</h2>
					</Col>
					<Col>
						<h3>First Year of Play</h3>
						<h2>{team.firstYearOfPlay}</h2>
					</Col>
					<Col>
						<h3>Website</h3>
						<h2>
							<a
								href={team.officialSiteUrl}
								rel='noopener noreferrer'
								target='_blank'>
								{team.officialSiteUrl}
							</a>
						</h2>
					</Col>
					<Col>
						<h3>Arena</h3>
						<h2>{team.venue.name}</h2>
					</Col>
					<Col>
						<h3>Current Time</h3>
						<h2>
							{time.toLocaleTimeString("en-US", { timeZone: team.venue.timeZone.id })}
						</h2>
					</Col>
					<Col>
						<h3>Games Played</h3>
						<h2>{teamStats.gamesPlayed}</h2>
					</Col>
				</Row>
				<Row justify='space-between'>
					<Col span={12}>
						<Collapse accordion>
							<Collapse.Panel className='centerText' header='Left Wing' key='1'>
								<Row justify='center' gutter={[16, 16]}>
									{leftWing.map((player, idx) => {
										return (
											<Col key={idx} span={8}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Center' key='2'>
								<Row justify='center' gutter={[16, 16]}>
									{centers.map((player, idx) => {
										return (
											<Col key={idx} span={8}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Right Wing' key='3'>
								<Row justify='center' gutter={[16, 16]}>
									{rightWings.map((player, idx) => {
										return (
											<Col key={idx} span={8}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Defenseman' key='4'>
								<Row justify='center' gutter={[16, 16]}>
									{defence.map((player, idx) => {
										return (
											<Col key={idx} span={8}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Goalie' key='5'>
								<Row justify='center' gutter={[16, 16]}>
									{goalies.map((player, idx) => {
										return (
											<Col key={idx} span={8}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
						</Collapse>
					</Col>
					<Col span={11}>
						<Row gutter={[16, 16]} justify='space-around'>
							<Col>
								<h3>Wins</h3>
								<h2>
									{teamRanks.wins} - {teamStats.wins}
								</h2>
							</Col>
							<Col>
								<h3>Losses</h3>
								<h2>
									{teamRanks.losses} - {teamStats.losses}
								</h2>
							</Col>
							<Col>
								<h3>Points</h3>
								<h2>
									{teamRanks.pts} - {teamStats.pts}
								</h2>
							</Col>
							<Col>
								<h3>Faceoff Wins %</h3>
								<h2>
									{teamRanks.faceOffWinPercentage} -{" "}
									{teamStats.faceOffWinPercentage}
								</h2>
							</Col>
							<Col>
								<h3>Shots Allowed</h3>
								<h2>
									{teamRanks.shotsAllowed} - {teamStats.shotsAllowed}
								</h2>
							</Col>
							<Col>
								<h3>Shots Per Game</h3>
								<h2>
									{teamRanks.shotsPerGame} - {teamStats.shotsPerGame}
								</h2>
							</Col>
						</Row>
					</Col>
				</Row>
			</BrowserView>
			<MobileView>
				<Row justify='space-around' gutter={[4, 4]}>
					<Col>
						<h3>Team</h3>
						<h2>{team.name}</h2>
					</Col>
					<Col>
						<h3>First Year of Play</h3>
						<h2>{team.firstYearOfPlay}</h2>
					</Col>
					<Col>
						<h3>Website</h3>
						<h2>
							<a
								href={team.officialSiteUrl}
								rel='noopener noreferrer'
								target='_blank'>
								{team.officialSiteUrl}
							</a>
						</h2>
					</Col>
					<Col>
						<h3>Arena</h3>
						<h2>{team.venue.name}</h2>
					</Col>
					<Col>
						<h3>Games Played</h3>
						<h2>{teamStats.gamesPlayed}</h2>
					</Col>
				</Row>
				<Row justify='space-between'>
					<Col span={24}>
						<Collapse accordion>
							<Collapse.Panel className='centerText' header='Left Wing' key='1'>
								<Row justify='center' gutter={[4, 4]}>
									{leftWing.map((player, idx) => {
										return (
											<Col key={idx} span={12}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Center' key='2'>
								<Row justify='center' gutter={[4, 4]}>
									{centers.map((player, idx) => {
										return (
											<Col key={idx} span={12}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Right Wing' key='3'>
								<Row justify='center' gutter={[4, 4]}>
									{rightWings.map((player, idx) => {
										return (
											<Col key={idx} span={12}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Defenseman' key='4'>
								<Row justify='center' gutter={[4, 4]}>
									{defence.map((player, idx) => {
										return (
											<Col key={idx} span={12}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
							<Collapse.Panel className='centerText' header='Goalie' key='5'>
								<Row justify='center' gutter={[4, 4]}>
									{goalies.map((player, idx) => {
										return (
											<Col key={idx} span={12}>
												<Button onClick={() => handlePlayer(player)} block>
													{player.person.fullName}
												</Button>
											</Col>
										);
									})}
								</Row>
							</Collapse.Panel>
						</Collapse>
					</Col>
					<Col span={24}>
						<Row gutter={[4, 4]} justify='space-around'>
							<Col>
								<h3>Wins</h3>
								<h2>
									{teamRanks.wins} - {teamStats.wins}
								</h2>
							</Col>
							<Col>
								<h3>Losses</h3>
								<h2>
									{teamRanks.losses} - {teamStats.losses}
								</h2>
							</Col>
							<Col>
								<h3>Points</h3>
								<h2>
									{teamRanks.pts} - {teamStats.pts}
								</h2>
							</Col>
							<Col>
								<h3>Faceoff Wins %</h3>
								<h2>
									{teamRanks.faceOffWinPercentage} -{" "}
									{teamStats.faceOffWinPercentage}
								</h2>
							</Col>
							<Col>
								<h3>Shots Allowed</h3>
								<h2>
									{teamRanks.shotsAllowed} - {teamStats.shotsAllowed}
								</h2>
							</Col>
							<Col>
								<h3>Shots Per Game</h3>
								<h2>
									{teamRanks.shotsPerGame} - {teamStats.shotsPerGame}
								</h2>
							</Col>
						</Row>
					</Col>
				</Row>
			</MobileView>
		</>
	);
};

export default Team;
