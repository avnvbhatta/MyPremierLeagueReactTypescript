import  React, {useEffect} from 'react';
import {getTeamStats, getLeagueTopScorers} from "../../helpers/api";

export interface StatsProps  {
    teamID: number;
}
 
const Stats: React.FC<StatsProps> = ({teamID}) => {

    useEffect(()=>{
        const getTeamStatsAsync = async () => {
            try {
                let response: any = await getTeamStats(teamID);
                // console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        const getLeagueTopScorersAsync = async () => {
            try {
                let response: any = await getLeagueTopScorers();
                // console.log(response);
            } catch (error) {
                console.log(error);
            }
            
        }

        getLeagueTopScorersAsync();
        getTeamStatsAsync();

    }, [])
    
    return (  
        <div>
            Stats Page
        </div>
    );
}
 
export default Stats;