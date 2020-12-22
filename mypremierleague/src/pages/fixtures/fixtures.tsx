import  React, {useEffect} from 'react';
import {getCurrentGameWeek, getUpcomingEPLFixtures} from "../../helpers/api";


export interface FixturesProps {
    
}
 
const Fixtures: React.FC<FixturesProps> = () => {
    useEffect(()=>{
       
        const getCurrentGameWeekAsync = async () => {
            let res = await getCurrentGameWeek();
            console.log(res);
        }

        const getUpcomingEPLFixturesAsync = async () => {
            let res = await getUpcomingEPLFixtures();
            console.log(res);
        }

         

        // getCurrentGameWeekAsync();
        // getUpcomingEPLFixturesAsync();

    }, [])
    return ( 
        <div>
            Fixtures Page
        </div>
     );
}
 
export default Fixtures;