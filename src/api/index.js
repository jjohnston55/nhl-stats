import axios from 'axios';

// https://gitlab.com/dword4/nhlapi/-/blob/master/stats-api.md
const ENDPOINT = 'https://statsapi.web.nhl.com/api/v1';

const NHL = function(attrs) {
    if (attrs) {
        Object.assign(this, attrs);
    }
};

NHL.prototype.GetTeams = function() {
    return axios.get(`${ENDPOINT}/teams`).then(response => {
        return response.data.teams;
    }).catch(err => console.error(err));
}

NHL.prototype.GetTeamRoster = function(teamID) {
    return axios.get(`${ENDPOINT}/teams/${teamID}/roster`).then(response => {
        return response.data.roster;
    }).catch(err => console.error(err));
}

NHL.prototype.GetPlayer = function(playerID) {
    return axios.get(`${ENDPOINT}/people/${playerID}`).then(response => {
        return response.data;
    }).catch(err => console.error(err));
}

NHL.prototype.GetPlayerStats = function(playerID, statType = 'statsSingleSeason') {
    return axios.get(`${ENDPOINT}/people/${playerID}/stats?stats=${statType}`).then(response => {
        return response.data;
    }).catch(err => console.error(err));
}

export default NHL;