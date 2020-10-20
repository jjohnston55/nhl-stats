import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import NHL from '../../../api';

const Home = (props) => {
    const api = new NHL();
    
    useEffect(() => {
        api.GetTeams().then(data => {
            console.log(data.teams);
        });
    }, []);

    return (
        <>
            <Row>
                <Col span={12}>Western Conference</Col>
                <Col span={12}>Eastern Conference</Col>
            </Row>
            <Row>
                <Col>Pacific</Col>
                <Col>Central</Col>
                <Col>Metropolitan</Col>
                <Col>Atlantic</Col>
            </Row>
        </>
    )
}

export default Home;