import * as React from 'react';
import { useEffect, useState } from 'react';
import {getTeamStats} from "../../helpers/api";
import { teamData } from '../../helpers/teamdata';
import Loading from '../loading/loading';
import "./teamStats.scss";

export interface TeamStatsProps {
    teamID: number
}
 
interface ITeamStats {
    goalsAgainst: number,
    goalsFor: number,
    matchesPlayed: number,
    wins: number,
    draws: number,
    losses: number
}


const TeamStats: React.SFC<TeamStatsProps> = ({teamID}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [teamStats, setTeamStats] = useState<ITeamStats>();

    useEffect(()=>{
        const getTeamStatsAsync = async () => {
            try {
                let response: any = await getTeamStats(teamID);
                let {
                    goals : {
                        goalsAgainst: {total: totalAgainst}, 
                        goalsFor: {total: totalFor} 
                    }, 
                    matchs: {
                        draws: {total: totalDraws}, 
                        loses: {total: totalLosses}, 
                        matchsPlayed: {total: totalMatches}, 
                        wins: {total: totalWins}
                    }
                } = response;
                let tempTeamStats: ITeamStats = {
                    goalsAgainst: totalAgainst,
                    goalsFor: totalFor,
                    matchesPlayed: totalMatches,
                    wins: totalWins,
                    draws: totalDraws,
                    losses: totalLosses
                }
                setTeamStats(tempTeamStats);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        getTeamStatsAsync();

    }, [])
    return ( 
        <>
            <div className="block">
                <div className="title">
                    Team Stats
                </div>
                <div className="content">
                    {isLoading ? <Loading /> :
                        <div className="teamStats">
                            <img className="teamStatsLogo" src={teamData[teamID].logo} alt="teamStatsLogo"/> 
                            <h2>Goals</h2>
                            <div className="goals">
                                <div>Scored: {teamStats?.goalsFor}</div>
                                <div>Conceded: {teamStats?.goalsAgainst}</div>
                            </div>
                            <h2>Matches</h2>
                            <div className="matches">
                                <div>Played: {teamStats?.matchesPlayed}</div>
                                <div>Wins: {teamStats?.wins}</div>
                                <div>Draws: {teamStats?.draws}</div>
                                <div>Losses: {teamStats?.losses}</div>
                            </div>
                        </div>
                        
                    }
                </div>
            </div>
        </>
     );
}
 
export default TeamStats;