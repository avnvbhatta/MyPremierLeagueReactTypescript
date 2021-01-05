import axios from "axios";
import {teamData} from "./teamdata";
const baseURL = 'https://v2.api-football.com/';

const axiosForAPIFootball = axios.create({
    baseURL: baseURL,
    headers: {'X-RapidAPI-Key': process.env.REACT_APP_API_KEY}
});

export const getUpcomingFixtures = async (teamSelect: number, numOfFixtures: number) => {
    try {
        let response = await axiosForAPIFootball.get(`/fixtures/team/${teamSelect}/next/${numOfFixtures}?timezone=America/New_York`)
        return response.data.api.fixtures;
    } catch (error) {
        console.log(error);
    }
    
}

export const getLeagueTable = async () => {
    try {
        let response = await axiosForAPIFootball.get(`/leagueTable/2790`);
        return response.data.api.standings[0];
    } catch (error) {
        console.log(error);
    }
}

export const getTeamNews = async (teamID: number) => {
    try {
        let response = await axios.get(`${teamData[teamID].subreddit}.json?limit=10`)
        return response.data.data.children;
    } catch (error) {
        console.log(error);
    }
    
}

export const getCurrentGameWeek = async () => {
    try {
        let response = await axiosForAPIFootball.get(`/fixtures/rounds/2790/current`)
        let data = response.data.api.fixtures[0];
        let matches = data.match(/(\d+)/); 
        let currentGW: number = parseInt(matches[0])-1; //as data fetched is 1 based index, not 0 based.
        return currentGW;
    } catch (error) {
        console.log(error);

    }
    
}

export const getUpcomingEPLFixtures = async () => {
    try {
        let response = await axiosForAPIFootball.get(`/fixtures/league/2790?timezone=America/New_York`);
        return response.data.api.fixtures;
    } catch (error) {
        console.log(error);
    }
    
}

export const getLeagueTopScorers = async () => {
    try {
        let response = await axiosForAPIFootball.get(`/topscorers/2790`)
        return response.data.api.topscorers.slice(0,10);
    } catch (error) {
        console.log(error);
    }
    
}

export const getTeamStats = async (teamID: number) => {
    try {
        let response = await axiosForAPIFootball.get(`/statistics/2790/${teamID}`)
        return response.data.api.statistics;
    } catch (error) {
        console.log(error);
    }
}




