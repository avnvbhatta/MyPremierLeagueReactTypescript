import  React, {useEffect, useState} from 'react';
import {getCurrentGameWeek, getUpcomingFixtures} from "../../helpers/api";

export interface UpcomingFixturesProps {
    teamID: number
}
 
const UpcomingFixtures: React.FC<UpcomingFixturesProps> = ({teamID}) => {

    const[isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(()=>{
        // axiosForAPIFootball.get()
        const getUpcomingFixturesAsync = async () => {
            try {
                let res = await getUpcomingFixtures(teamID, 5);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            
        }

        const getCurrentGameWeekAsync = async () => {
            try {
                let res = await getCurrentGameWeek();
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            
        }

        getUpcomingFixturesAsync();
        getCurrentGameWeekAsync();
        setIsLoading(false);

    }, [])
    
    return ( 
        <div>

        </div>
     );
}
 
export default UpcomingFixtures;