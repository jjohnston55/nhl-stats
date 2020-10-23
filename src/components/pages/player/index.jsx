import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Descriptions, Empty, Row } from 'antd';

import NHL from '../../../api';

const Player = (props) => {
    const playerID = props.playerID;
    const [player, setPlayer] = useState({});
    const [position, setPosition] = useState({});
    const [team, setTeam] = useState({});
    const [stats, setStats] = useState({});
    const [ranks, setRanks] = useState({});
    const [season, setSeason] = useState({});
    const api = new NHL();
    const cancelToken = axios.CancelToken.source();

    useEffect(() => {
        api.GetPlayer(playerID).then(data => {
            console.log(data);
            setPlayer(data);
            setPosition(data.primaryPosition);
            setTeam(data.currentTeam);
            api.GetPlayerStats(playerID, cancelToken.token).then(playerStats => {
                if(playerStats.splits.length > 0) {
                    console.log(playerStats.splits[0].stat);
                    setStats(playerStats.splits[0].stat);
                    setSeason(playerStats.splits[0].season);
                }
            });
            api.GetPlayerStats(playerID, cancelToken.token, 'regularSeasonStatRankings').then(playerRanks => {
                if(playerRanks.splits.length > 0) {
                    console.log(playerRanks.splits[0].stat);
                    setRanks(playerRanks.splits[0].stat);
                }
            });
        });
        return () => {
            console.log('cancelled')
            cancelToken.cancel();
        }
    }, [playerID]);

    return (
        <>
            <Row gutter={[16, 16]} justify='center'>
                <Col span={10}>
                    <Descriptions bordered title='Player' layout='vertical'>
                        <Descriptions.Item label='Name'>{player.fullName}</Descriptions.Item>
                        <Descriptions.Item label='Number'>{player.primaryNumber}</Descriptions.Item>
                        <Descriptions.Item label='Team'>{team.name}</Descriptions.Item>
                        <Descriptions.Item label='Nationality'>{player.nationality}</Descriptions.Item>
                        <Descriptions.Item label='Province/State'>{player.birthStateProvince}</Descriptions.Item>
                        <Descriptions.Item label='City'>{player.birthCity}</Descriptions.Item>
                        <Descriptions.Item label='Birth Date'>{player.birthDate}</Descriptions.Item>
                        <Descriptions.Item label='Age'>{player.currentAge}</Descriptions.Item>
                        <Descriptions.Item label='Position'>{position.name}</Descriptions.Item>
                        <Descriptions.Item label='Height'>{player.height}</Descriptions.Item>
                        <Descriptions.Item label='Weight'>{player.weight}</Descriptions.Item>
                        <Descriptions.Item label='Shoots'>{player.shootsCatches === 'L' ? 'Left' : 'Right'}</Descriptions.Item>
                    </Descriptions>
                </Col>
                {
                    Object.keys(stats).length > 0 && Object.keys(ranks).length > 0 ?
                    <Col span={10}>
                        {
                            player.primaryPosition.code == 'G' ?
                            <Descriptions bordered title='Stats' layout='vertical'>
                                <Descriptions.Item label='Season'>{season.toString()}</Descriptions.Item>
                                <Descriptions.Item label='Time On Ice'>{ranks.timeOnIce} - {stats.timeOnIce}</Descriptions.Item>
                                <Descriptions.Item label='Games'>{ranks.games} - {stats.games}</Descriptions.Item>
                                <Descriptions.Item label='Shots Against'>{ranks.shotsAgainst} - {stats.shotsAgainst}</Descriptions.Item>
                                <Descriptions.Item label='Goals Against'>{ranks.goalsAgainst} - {stats.goalsAgainst}</Descriptions.Item>
                                <Descriptions.Item label='Goals Against Average'>{ranks.goalsAgainstAverage} - {stats.goalAgainstAverage}</Descriptions.Item>
                                <Descriptions.Item label='Shutouts'>{ranks.shutOuts} - {stats.shutouts}</Descriptions.Item>
                                <Descriptions.Item label='Saves'>{ranks.saves} - {stats.saves}</Descriptions.Item>
                                <Descriptions.Item label='Save Percentage'>{ranks.savePercentage} - {stats.savePercentage}</Descriptions.Item>
                            </Descriptions>
                            :
                            <Descriptions bordered title='Stats' layout='vertical'>
                                <Descriptions.Item label='Season'>{season.toString()}</Descriptions.Item>
                                <Descriptions.Item label='Points'>{ranks.rankPoints} - {stats.points}</Descriptions.Item>
                                <Descriptions.Item label='Shot %'>{ranks.rankShotPct} - {stats.shotPct}</Descriptions.Item>
                                <Descriptions.Item label='Shots'>{ranks.rankShots} - {stats.shots}</Descriptions.Item>
                                <Descriptions.Item label='Goals'>{ranks.rankGoals} - {stats.goals}</Descriptions.Item>
                                <Descriptions.Item label='Assists'>{ranks.rankAssists} - {stats.assists}</Descriptions.Item>
                                <Descriptions.Item label='PPG'>{ranks.rankPowerPlayGoals} - {stats.powerPlayGoals}</Descriptions.Item>
                                <Descriptions.Item label='PPP'>{stats.powerPlayPoints}</Descriptions.Item>
                                <Descriptions.Item label='Faceoff %'>{stats.faceOffPct}</Descriptions.Item>
                            </Descriptions>
                        }
                    </Col>
                    : <Col span={10}><Empty /></Col>
                }
            </Row>
        </>
    )
}

export default Player;