import axios from "axios"
const baseURL = 'https://v2.api-football.com/';

const axiosForAPIFootball = axios.create({
    baseURL: baseURL,
    headers: {'X-RapidAPI-Key': process.env.REACT_APP_API_KEY}
});

export const getUpcomingFixtures = async (teamSelect: number, numOfFixtures: number) => {
    let response = await axiosForAPIFootball.get(`/fixtures/team/${teamSelect}/next/${numOfFixtures}?timezone=America/New_York`)
    return response.data.api.fixtures;
}

export const getLeagueTable = async () => {
    let response = await axiosForAPIFootball.get(`/leagueTable/2790`);
    return response.data.api.standings[0];
}

export const getTeamNews = async (subreddit: string) => {
    let response = await axiosForAPIFootball.get(`${subreddit}.json?limit=10`)
    return response.data.data.children;
}

export const getCurrentGameWeek = async () => {
    let response = await axiosForAPIFootball.get(`/fixtures/rounds/2790/current`)
    let data = response.data.api.fixtures[0];
    let matches = data.match(/(\d+)/); 
    let currentGW: number = parseInt(matches[0])-1; //as data fetched is 1 based index, not 0 based.
    return currentGW;
}

export const getUpcomingEPLFixtures = async () => {
    let response = await axiosForAPIFootball.get(`/fixtures/league/2790?timezone=America/New_York`);
    return response.data.api.fixtures;
}

export const getLeagueTopScorers = async () => {
    let response = await axiosForAPIFootball.get(`/topscorers/2790`)
    return response.data.api.topscorers;
}

export const getTeamStats = async (teamID: number) => {
    let response = await axiosForAPIFootball.get(`/statistics/2790/${teamID}`)
    return response.data.api.statistics;
}




