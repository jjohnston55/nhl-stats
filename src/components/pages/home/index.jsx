import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Alert, Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { BrowserView, MobileView } from 'react-device-detect';

import * as viewActions from '../../../actions/viewActions';

import NHL from '../../../api';

const Home = (props) => {
    const dispatch = useDispatch();
    const cancelToken = axios.CancelToken.source();

    const api = new NHL();
    const [pacificTeams, setPacificTeams] = useState([]);
    const [centralTeams, setCentralTeams] = useState([]);
    const [metroTeams, setMetroTeams] = useState([]);
    const [atlanticTeams, setAtlanticTeams] = useState([]);
    
    useEffect(() => {
        api.GetTeams(cancelToken.token).then(data => {
            const pTeams = []
            const cTeams = [];
            const mTeams = [];
            const aTeams = [];
            data.forEach(team => {
                switch (team.division.abbreviation) {
                    case 'P':
                        pTeams.push(team);
                        break;
                    case 'C':
                        cTeams.push(team);
                        break;
                    case 'M':
                        mTeams.push(team);
                        break;
                    case 'A':
                        aTeams.push(team);
                        break;
                    default:
                        break;
                }
            });
            setPacificTeams(pTeams);
            setCentralTeams(cTeams);
            setMetroTeams(mTeams);
            setAtlanticTeams(aTeams);
        });
        return () => {
            cancelToken.cancel()
        }
    }, []);

    const handleTeam = (team) => {
        console.log(team);
        dispatch(viewActions.changeView('team', team));
    }

    return (
        <>
            <BrowserView>
                <Row gutter={[16,16]}>
                    <Col span={12}>
                        <Alert className='centerText' message='Western Conference' type='info' />
                    </Col>
                    <Col span={12}>
                        <Alert className='centerText' message='Eastern Conference' type='info' />
                    </Col>
                </Row>
                <Row gutter={[16,16]}>
                    <Col span={6}>
                        <Alert className='centerText' message='Pacific' type='info' />
                    </Col>
                    <Col span={6}>
                        <Alert className='centerText' message='Central' type='info' />
                    </Col>
                    <Col span={6}>
                        <Alert className='centerText' message='Metropolitan' type='info' />
                    </Col>
                    <Col span={6}>
                        <Alert className='centerText' message='Atlantic' type='info' />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        {
                            pacificTeams.map((team, idx) => {
                                return (
                                    <Row key={idx} gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                    <Col span={6}>
                        {
                            centralTeams.map((team, idx) => {
                                return (
                                    <Row key={idx} gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                    <Col span={6}>
                        {
                            metroTeams.map((team, idx) => {
                                return (
                                    <Row key={idx} gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                    <Col span={6}>
                        {
                            atlanticTeams.map((team, idx) => {
                                return (
                                    <Row key={idx} gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Col>
                </Row>
            </BrowserView>
            <MobileView>
                <Row gutter={[8,8]}>
                    <Col span={12}>
                        <Alert className='centerText' message='Western Conference' type='info' />
                    </Col>
                    <Col span={12}>
                        <Alert className='centerText' message='Eastern Conference' type='info' />
                    </Col>
                </Row>
                <Tabs centered defaultActiveKey={1} type='card'>
                    <Tabs.TabPane tab='Pacific' key='1'>
                        <Row gutter={[8,8]} justify='center'>
                        {
                            pacificTeams.map((team, idx) => {
                                return (
                                    <Col key={idx} span={16}>
                                        <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Central' key='2'>
                        <Row gutter={[8,8]} justify='center'>
                        {
                            centralTeams.map((team, idx) => {
                                return (
                                    <Col key={idx} span={16}>
                                        <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Metropolitan' key='3'>
                        <Row gutter={[8,8]} justify='center'>
                        {
                            metroTeams.map((team, idx) => {
                                return (
                                    <Col key={idx} span={16}>
                                        <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab='Atlantic' key='4'>
                        <Row gutter={[8,8]} justify='center'>
                        {
                            atlanticTeams.map((team, idx) => {
                                return (
                                    <Col key={idx} span={16}>
                                        <Button onClick={() => handleTeam(team)} type='primary' size='large' block>{team.name}</Button>
                                    </Col>
                                )
                            })
                        }
                        </Row>
                    </Tabs.TabPane>
                </Tabs>
            </MobileView>
        </>
    )
}

export default Home;