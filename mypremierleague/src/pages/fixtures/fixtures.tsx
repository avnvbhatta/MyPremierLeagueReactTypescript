import  React, {useEffect, useState} from 'react';
import {getCurrentGameWeek, getUpcomingEPLFixtures} from "../../helpers/api";
import moment from "moment";
import "./fixtures.scss"
import Loading from '../../components/loading/loading';
import FixtureRow from '../../components/FixtureRow/fixtureRow';

export interface FixturesProps {
    
}

interface IFixtures{
    fixtures: IFixture[]
}

interface IFixture{
    fixture: IFixtureRow[]
}

interface IFixtureRow{
    homeTeamName: string,
    homeTeamLogo: string,
    homeTeamGoals: number,
    awayTeamName: string,
    awayTeamLogo: string,
    awayTeamGoals: number
    eventDate: string,
}

const ChevronLeft = () => 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
 
const ChevronRight = () =>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>


const Fixtures: React.FC<FixturesProps> = () => {

    const [currentGameWeek, setCurrentGameWeek] = useState<number>(0);
    const [selectedGameWeek, setSelectedGameWeek] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fixtures, setFixtures] = useState<IFixtures>();

    useEffect(()=>{
       
        const getCurrentGameWeekAsync = async () => {
            try {
                // let res = await getCurrentGameWeek();
                // console.log(res);
                setCurrentGameWeek(15);
                setSelectedGameWeek(15);
            } catch (error) {
                console.log(error);
            }
            
        }

        const getUpcomingEPLFixturesAsync = async () => {
            try {
                let res = await getUpcomingEPLFixtures();
                let fixtures: IFixture[] = [];
                for(let j =0; j<38; j++){
                    let fixtureRows: IFixtureRow[] = [];

                    for(let i=0+j*10; i<j*10+10; i++){

                        let {
                            homeTeam: {logo: homeTeamLogo, team_name: homeTeamName},
                            awayTeam: {logo: awayTeamLogo, team_name: awayTeamName},
                            event_date, goalsHomeTeam, goalsAwayTeam
                        } = res[i];
    
                        let fixtureRow: IFixtureRow = {
                            homeTeamName: homeTeamName,
                            homeTeamLogo: homeTeamLogo,
                            homeTeamGoals: parseInt(goalsHomeTeam),
                            awayTeamName: awayTeamName,
                            awayTeamLogo: awayTeamLogo,
                            awayTeamGoals: parseInt(goalsAwayTeam),
                            eventDate: event_date,
                        }
                        fixtureRows.push(fixtureRow);
                    }

                    let tempFixture: IFixture = {
                        fixture: fixtureRows
                    }
                    
                    fixtures.push(tempFixture);

                }
                let finalFixtures: IFixtures = {
                    fixtures: fixtures
                }
                setFixtures(finalFixtures);
                setIsLoading(false);

            } catch (error) {
                console.log(error)
            }
        }

        getCurrentGameWeekAsync();
        getUpcomingEPLFixturesAsync();

    }, [])

    const generateGW  = () => {
        let gws: any = [];
        for(let i=0; i<38; i++){
            gws.push(<option key={i} value={i}>Gameweek {i === currentGameWeek ? `${i+1} (Current)` : i+1}</option>);
        }
        return gws;
    }

    const decreaseGW = () => {
        setSelectedGameWeek(selectedGameWeek-1);
    }
    
    const increaseGW = () => {
        setSelectedGameWeek(selectedGameWeek+1);
        
    }

    const handleSelectChange = (event) => {
        setSelectedGameWeek(event.target.value);
    }

    useEffect(()=> {

    }, [fixtures])

    return ( 
        <div className="block">
            <div className="title">
                <div>EPL Fixtures</div>
                <div className="gameweekSelect">
                    <div className="chev" onClick={decreaseGW}>
                        <ChevronLeft />
                    </div>
                    <select name="gwSelect" id="gwSelect" value={selectedGameWeek} onChange={e => handleSelectChange(e)} >
                        {generateGW()}
                    </select>
                    <div className="chev" onClick={increaseGW}>
                        <ChevronRight />
                    </div>
                </div>
            </div>
            
            <div className="content">
                {isLoading ? <Loading /> :  
                    <>
                        {fixtures?.fixtures[selectedGameWeek].fixture.map((fixtureRow, idx)=> {
                            return <FixtureRow fixtureRow={fixtureRow} key={idx}/>
                        })}
                    </>
                }
            </div>
        </div>
     );
}
 
export default Fixtures;