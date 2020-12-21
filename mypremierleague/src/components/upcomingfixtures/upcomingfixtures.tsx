import  React, {useEffect} from 'react';
import {getCurrentGameWeek, getUpcomingFixtures} from "../../helpers/api";

export interface UpcomingFixturesProps {
    
}
 
const UpcomingFixtures: React.FC<UpcomingFixturesProps> = () => {

    useEffect(()=>{
        // axiosForAPIFootball.get()
        const getUpcomingFixturesAsync = async () => {
            let res = await getUpcomingFixtures(33, 5);
            console.log(res);
        }

        const getCurrentGameWeekAsync = async () => {
            let res = await getCurrentGameWeek();
            console.log(res);
        }

        getUpcomingFixturesAsync();
        getCurrentGameWeekAsync();

    }, [])
    
    return ( 
        <div>

        </div>
     );
}
 
export default UpcomingFixtures;