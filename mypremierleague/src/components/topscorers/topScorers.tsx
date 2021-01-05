import * as React from 'react';
import { useEffect, useState } from 'react';
import {getLeagueTopScorers} from "../../helpers/api";
import {teamData} from "../../helpers/teamdata";
import Loading from '../loading/loading';
import "./topScorers.scss";

export interface TopScorersProps {
    
}
 
interface ITopScorers {
    topScorers: ITopScorer[]
}

interface ITopScorer {
    name: string,
    teamID: number,
    teamName: string,
    teamLogo: string,
    goals: number,
    assists: number
}
 
const TopScorers: React.FC<TopScorersProps> = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [topScorers, setTopScorers] = useState<ITopScorers>();

    useEffect(()=>{
        const getLeagueTopScorersAsync = async () => {
            try {
                let response: any = await getLeagueTopScorers();
                let tempTopScorerArray: ITopScorer[] = []
                response.map(scorer => {
                    let {player_name, team_id, team_name, goals: {total, assists}} = scorer;
                    let tempTopScorer: ITopScorer = {
                        name: player_name,
                        teamID: team_id,
                        teamName: team_name,
                        teamLogo: teamData[team_id].logo,
                        goals: total,
                        assists: assists
                    }
                    tempTopScorerArray.push(tempTopScorer);
                })
                let tempTopScorers: ITopScorers = {
                    topScorers: tempTopScorerArray
                }
                setTopScorers(tempTopScorers);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        getLeagueTopScorersAsync();

    }, [])

    return ( 
        <>
            <div className="block">
                <div className="title">Top Scorers</div>
                <div className="content">
                    {isLoading ? <Loading /> :
                    topScorers?.topScorers.map((scorer,idx) => {
                        return <div key={idx} className="scorer">
                                <div className="team">
                                    <img src={scorer.teamLogo} alt="teamLogo"/>
                                </div>
                                <div className="info">
                                    <div className="player">
                                        {scorer.name}
                                    </div>
                                    <div className="teamName">
                                        {scorer.teamName}
                                    </div>
                                    <div className="goalsAssists">
                                        <div className="goals">Goals: {scorer.goals}</div>
                                        <div className="assists">Assists: {scorer.assists ? scorer.assists : 0}</div>
                                    </div>
                                </div>
                            </div>
                    } )    
                }
                </div>
            </div>
        </>
     );
}
 
export default TopScorers;