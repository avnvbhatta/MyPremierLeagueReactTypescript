import  React, {useEffect, useState} from 'react';
import {getCurrentGameWeek, getUpcomingEPLFixtures} from "../../helpers/api";


export interface FixturesProps {
    
}
 
const Fixtures: React.FC<FixturesProps> = () => {

    const [currentGameWeek, setCurrentGameWeek] = useState<Number>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(()=>{
       
        const getCurrentGameWeekAsync = async () => {
            try {
                let res = await getCurrentGameWeek();
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            
        }

        const getUpcomingEPLFixturesAsync = async () => {
            try {
                let res = await getUpcomingEPLFixtures();
                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }

        getCurrentGameWeekAsync();
        getUpcomingEPLFixturesAsync();
        setIsLoading(false);

    }, [])
    return ( 
        <div>
            Fixtures Page
        </div>
     );
}
 
export default Fixtures;