import * as React from 'react';
// import {teamData} from "../../helpers/teamdata";
import UpcomingFixtures from "../../components/upcomingfixtures/upcomingfixtures";
import LeagueTable from '../../components/leaguetable/leaguetable';
import { IUserToken } from '../../helpers/useToken';
import News from '../../components/news/news';
import {teamData} from "../../helpers/teamdata";

export interface HomeProps {
    teamID: number;
}
 
const Home: React.FC<HomeProps> = ({teamID}) => {
    return ( 
        <div>
            Home Page
            {/* <UpcomingFixtures teamID={token.teamID} /> */}
            {/* <LeagueTable /> */}
            {/* <News teamID={token.teamID}/> */}
        </div>
     );
}
 
export default Home;