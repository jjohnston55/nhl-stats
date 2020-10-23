import axios from 'axios';

// https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
const ENDPOINT = 'https://statsapi.web.nhl.com/api/v1';

const NHL = function(attrs) {
    if (attrs) {
        Object.assign(this, attrs);
    }
};

NHL.prototype.GetTeams = function(cancelToken) {
    return axios.get(`${ENDPOINT}/teams`, {
        cancelToken: cancelToken
    }).then(response => {
        return response.data.teams;
    }).catch(err => console.error(err));
}

NHL.prototype.GetTeamRoster = function(teamID, cancelToken) {
    return axios.get(`${ENDPOINT}/teams/${teamID}/roster`, {
        cancelToken: cancelToken
    }).then(response => {
        return response.data.roster;
    }).catch(err => console.error(err));
}

NHL.prototype.GetPlayer = function(playerID, cancelToken) {
    return axios.get(`${ENDPOINT}/people/${playerID}`, {
        cancelToken: cancelToken
    }).then(response => {
        return response.data.people[0];
    }).catch(err => console.error(err));
}

NHL.prototype.GetPlayerStats = function(playerID, cancelToken, statType = 'statsSingleSeason') {
    return axios.get(`${ENDPOINT}/people/${playerID}/stats?stats=${statType}`, {
        cancelToken: cancelToken
    }).then(response => {
        return response.data.stats[0];
    }).catch(err => console.error(err));
}

export default NHL;