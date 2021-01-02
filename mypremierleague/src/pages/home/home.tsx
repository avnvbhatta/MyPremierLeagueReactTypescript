import * as React from 'react';
import UpcomingFixtures from "../../components/upcomingfixtures/upcomingfixtures";
import LeagueTable from '../../components/leaguetable/leaguetable';
import News from '../../components/news/news';
import "./home.scss";

export interface HomeProps {
    teamID: number;
}
 
const Home: React.FC<HomeProps> = ({teamID}) => {
    return ( 
        <div className="homeContainer">
            <div className="fixtureNews">
                <div className="fixture">
                    <UpcomingFixtures teamID={teamID} />   
                </div>
                <div className="news">
                    <News teamID={teamID}/>
                </div>
            </div>
            <div className="table">
                <LeagueTable />
            </div>
        </div>
     );
}
 
export default Home;