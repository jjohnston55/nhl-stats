import React, { useEffect, useState } from 'react';
import { Col, Descriptions, Row } from 'antd';

import NHL from '../../../api';

const Player = (props) => {
    const playerID = props.player.person.id;
    const [player, setPlayer] = useState({});
    const [stats, setStats] = useState({});
    const [ranks, setRanks] = useState({});
    const [season, setSeason] = useState({});
    const api = new NHL();

    useEffect(() => {
        api.GetPlayer(playerID).then(data => {
            console.log(data);
            setPlayer(data);
            api.GetPlayerStats(playerID).then(playerStats => {
                console.log(playerStats.stat);
                setStats(playerStats.stat);
                setSeason(playerStats.season);
            });
            api.GetPlayerStats(playerID, 'regularSeasonStatRankings').then(playerRanks => {
                console.log(playerRanks.stat);
                setRanks(playerRanks.stat);
            })
        });
    }, [playerID]);

    return (
        <>
            <Row gutter={[16, 16]} justify='center'>
                <Col>
                    <Descriptions bordered title='Player'>
                        <Descriptions.Item label='Name' span={2}>{player.fullName}</Descriptions.Item>
                        <Descriptions.Item label='Number'>{player.primaryNumber}</Descriptions.Item>
                        <Descriptions.Item label='Nationality'>{player.nationality}</Descriptions.Item>
                        <Descriptions.Item label='Birth Date'>{player.birthDate}</Descriptions.Item>
                        <Descriptions.Item label='Age'>{player.currentAge}</Descriptions.Item>
                        <Descriptions.Item label='Height'>{player.height}</Descriptions.Item>
                        <Descriptions.Item label='Weight'>{player.weight}</Descriptions.Item>
                        <Descriptions.Item label='Shoots'>{player.shootsCatches == 'L' ? 'Left' : 'Right'}</Descriptions.Item>
                        {/* <Descriptions.Item label='Position'>{player.primaryPosition.name}</Descriptions.Item> */}
                        {/* <Descriptions.Item label='Team'>{player.currentTeam.name}</Descriptions.Item> */}
                    </Descriptions>
                </Col>
                <Col>
                    <Descriptions bordered title='Stats'>
                        <Descriptions.Item label='Season' span={3}>{season.toString()}</Descriptions.Item>
                        <Descriptions.Item label='Goals'>{ranks.rankGoals} - {stats.goals}</Descriptions.Item>
                        <Descriptions.Item label='Assists'>{ranks.rankAssists} - {stats.assists}</Descriptions.Item>
                        <Descriptions.Item label='Points'>{ranks.rankPoints} - {stats.points}</Descriptions.Item>
                        <Descriptions.Item label='Shots'>{ranks.rankShots} - {stats.shots}</Descriptions.Item>
                        <Descriptions.Item label='PPG'>{ranks.rankPowerPlayGoals} - {stats.powerPlayGoals}</Descriptions.Item>
                        <Descriptions.Item label='PPP'>{stats.powerPlayPoints}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </>
    )
}

export default Player;