import  React, {useEffect, useState} from 'react';
import TeamStats from '../../components/teamstats/teamStats';
import TopScorers from '../../components/topscorers/topScorers';
import "./stats.scss";

export interface StatsProps  {
    teamID: number;
}



const Stats: React.FC<StatsProps> = ({teamID}) => {
   

    return (  
        <div className="statsContainer">
            <div className="topScorersContainer">
                <TopScorers />
            </div>
            <div className="teamStatsContainer" >
                <TeamStats teamID={teamID}/>
            </div>
        </div>
    );
}
 
export default Stats;