import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Button, Alert, Tabs } from "antd";
import { useDispatch } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";

import * as viewActions from "../../../actions/viewActions";

import NHL from "../../../api";

const Home = (props) => {
	const dispatch = useDispatch();
	const cancelToken = axios.CancelToken.source();

	const api = new NHL();
	const [northTeams, setNorthTeams] = useState([]);
	const [westTeams, setWestTeams] = useState([]);
	const [centralTeams, setCentralTeams] = useState([]);
	const [eastTeams, setEastTeams] = useState([]);

	useEffect(() => {
		api.GetTeams(cancelToken.token).then((data) => {
			const nTeams = [];
			const wTeams = [];
			const cTeams = [];
			const eTeams = [];
			data.forEach((team) => {
				switch (team.division.id) {
					case 28:
						nTeams.push(team);
						break;
					case 27:
						wTeams.push(team);
						break;
					case 26:
						cTeams.push(team);
						break;
					case 25:
						eTeams.push(team);
						break;
					default:
						break;
				}
			});
			setNorthTeams(nTeams);
			setWestTeams(wTeams);
			setCentralTeams(cTeams);
			setEastTeams(eTeams);
		});
		return () => {
			cancelToken.cancel();
		};
	}, []);

	const handleTeam = (team) => {
		console.log(team);
		dispatch(viewActions.changeView("team", team));
	};

	return (
		<>
			<BrowserView>
				<Row gutter={[16, 16]}>
					<Col span={6}>
						<Alert
							className="centerText"
							message="North"
							type="info"
						/>
					</Col>
					<Col span={6}>
						<Alert
							className="centerText"
							message="West"
							type="info"
						/>
					</Col>
					<Col span={6}>
						<Alert
							className="centerText"
							message="Central"
							type="info"
						/>
					</Col>
					<Col span={6}>
						<Alert
							className="centerText"
							message="East"
							type="info"
						/>
					</Col>
				</Row>
				<Row gutter={[16, 16]}>
					<Col span={6}>
						{northTeams.map((team, idx) => {
							return (
								<Row key={idx} gutter={[16, 16]}>
									<Col span={24}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								</Row>
							);
						})}
					</Col>
					<Col span={6}>
						{westTeams.map((team, idx) => {
							return (
								<Row key={idx} gutter={[16, 16]}>
									<Col span={24}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								</Row>
							);
						})}
					</Col>
					<Col span={6}>
						{centralTeams.map((team, idx) => {
							return (
								<Row key={idx} gutter={[16, 16]}>
									<Col span={24}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								</Row>
							);
						})}
					</Col>
					<Col span={6}>
						{eastTeams.map((team, idx) => {
							return (
								<Row key={idx} gutter={[16, 16]}>
									<Col span={24}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								</Row>
							);
						})}
					</Col>
				</Row>
			</BrowserView>
			<MobileView>
				<Row gutter={[8, 8]}>
					<Col span={12}>
						<Alert
							className="centerText"
							message="Western Conference"
							type="info"
						/>
					</Col>
					<Col span={12}>
						<Alert
							className="centerText"
							message="Eastern Conference"
							type="info"
						/>
					</Col>
				</Row>
				<Tabs centered defaultActiveKey={1} type="card">
					<Tabs.TabPane tab="Pacific" key="1">
						<Row gutter={[8, 8]} justify="center">
							{northTeams.map((team, idx) => {
								return (
									<Col key={idx} span={16}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								);
							})}
						</Row>
					</Tabs.TabPane>
					<Tabs.TabPane tab="Central" key="2">
						<Row gutter={[8, 8]} justify="center">
							{westTeams.map((team, idx) => {
								return (
									<Col key={idx} span={16}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								);
							})}
						</Row>
					</Tabs.TabPane>
					<Tabs.TabPane tab="Metropolitan" key="3">
						<Row gutter={[8, 8]} justify="center">
							{centralTeams.map((team, idx) => {
								return (
									<Col key={idx} span={16}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								);
							})}
						</Row>
					</Tabs.TabPane>
					<Tabs.TabPane tab="Atlantic" key="4">
						<Row gutter={[8, 8]} justify="center">
							{eastTeams.map((team, idx) => {
								return (
									<Col key={idx} span={16}>
										<Button
											onClick={() => handleTeam(team)}
											type="primary"
											size="large"
											block>
											{team.name}
										</Button>
									</Col>
								);
							})}
						</Row>
					</Tabs.TabPane>
				</Tabs>
			</MobileView>
		</>
	);
};

export default Home;
