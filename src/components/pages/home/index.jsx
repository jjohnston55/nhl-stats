import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'antd';
import './index.css';

import NHL from '../../../api';

const Home = (props) => {
    const api = new NHL();
    const [pacificTeams, setPacificTeams] = useState([]);
    const [centralTeams, setCentralTeams] = useState([]);
    const [metroTeams, setMetroTeams] = useState([]);
    const [atlanticTeams, setAtlanticTeams] = useState([]);
    
    useEffect(() => {
        api.GetTeams().then(data => {
            const pTeams = []
            const cTeams = [];
            const mTeams = [];
            const aTeams = [];
            data.teams.forEach(team => {
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
                }
            });
            setPacificTeams(pTeams);
            setCentralTeams(cTeams);
            setMetroTeams(mTeams);
            setAtlanticTeams(aTeams);
        });
    }, []);

    return (
        <>
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
                                        <Button onClick={() => console.log(team)} type='primary' size='large' block>{team.teamName}</Button>
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
                                        <Button onClick={() => console.log(team)} type='primary' size='large' block>{team.teamName}</Button>
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
                                        <Button onClick={() => console.log(team)} type='primary' size='large' block>{team.teamName}</Button>
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
                                        <Button onClick={() => console.log(team)} type='primary' size='large' block>{team.teamName}</Button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </Col>
            </Row>
        </>
    )
}

export default Home;