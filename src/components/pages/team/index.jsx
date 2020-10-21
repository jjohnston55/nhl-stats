import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Alert, Button } from 'antd';

import * as viewActions from '../../../actions/viewActions';

import NHL from '../../../api';

const Team = (props) => {
    const dispatch = useDispatch();
    const team = props.team;

    const time = new Date();

    const api = new NHL();
    const [leftWing, setLeftWing] = useState([]);
    const [centers, setCenters] = useState([]);
    const [rightWings, setRightWings] = useState([]);
    const [defence, setDefence] = useState([]);
    const [goalies, setGoalies] = useState([]);

    const l = [];
    const c = [];
    const r = [];
    const d = [];
    const g = [];

    useEffect(() => {
        api.GetTeamRoster(team.id).then(data => {
            data.forEach(player => {
                switch (player.position.code) {
                    case 'L':
                        l.push(player);
                        break;
                    case 'C':
                        c.push(player);
                        break;
                    case 'R':
                        r.push(player);
                        break;
                    case 'D':
                        d.push(player);
                        break;
                    case 'G':
                        g.push(player);
                        break;
                }
            });
            setLeftWing(l);
            setCenters(c);
            setRightWings(r);
            setDefence(d);
            setGoalies(g);
        });
    }, [team]);

    const handlePlayer = (player) => {
        console.log(player);
        dispatch(viewActions.changeView('player', player));
    }

    return (
        <>
            <Row justify='center' gutter={[16, 16]}>
                <Col>
                    <h3>City</h3>
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
                    <h2><a href={team.officialSiteUrl} rel='noopenner noreferrer' target='_blank'>{team.officialSiteUrl}</a></h2>
                </Col>
                <Col>
                    <h3>Arena</h3>
                    <h2>{team.venue.name}</h2>
                </Col>
                <Col>
                    <h3>Current Time</h3>
                    <h2>{time.toLocaleTimeString('en-US', { timeZone: team.venue.timeZone.id})}</h2>
                </Col>
            </Row>
            <Row justify='space-around'>
                <Col span={6}>
                    <Alert className='centerText' message='Left Wing' type='info' />
                    <Row justify='center' gutter={[16, 16]}>
                    {
                        leftWing.map((player, idx) => {
                            return (
                                <Col key={idx} span={12}>
                                    <Button onClick={() => handlePlayer(player)}  block>{player.person.fullName}</Button>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Col>
                <Col span={6}>
                    <Alert className='centerText' message='Center' type='info' />
                    <Row justify='center' gutter={[16, 16]}>
                    {
                        centers.map((player, idx) => {
                            return (
                                <Col key={idx} span={12}>
                                    <Button onClick={() => handlePlayer(player)} block>{player.person.fullName}</Button>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Col>
                <Col span={6}>
                    <Alert className='centerText' message='Right Wing' type='info' />
                    <Row justify='center' gutter={[16, 16]}>
                    {
                        rightWings.map((player, idx) => {
                            return (
                                <Col key={idx} span={12}>
                                    <Button onClick={() => handlePlayer(player)} block>{player.person.fullName}</Button>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Col>
            </Row>
            <Row justify='space-around'>
                <Col span={6}>
                    <Alert className='centerText' message='Defenseman' type='info' />
                    <Row justify='center' gutter={[16, 16]}>
                    {
                        defence.map((player, idx) => {
                            return (
                                <Col key={idx} span={12}>
                                    <Button onClick={() => handlePlayer(player)} block>{player.person.fullName}</Button>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Col>
                <Col span={6}>
                    <Alert className='centerText' message='Goalie' type='info' />
                    <Row justify='center' gutter={[16, 16]}>
                    {
                        goalies.map((player, idx) => {
                            return (
                                <Col key={idx} span={12}>
                                    <Button onClick={() => handlePlayer(player)} block>{player.person.fullName}</Button>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Team;