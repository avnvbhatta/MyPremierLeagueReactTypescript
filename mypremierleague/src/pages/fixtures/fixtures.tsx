import  React, {useEffect, useState} from 'react';
import {getCurrentGameWeek, getUpcomingEPLFixtures} from "../../helpers/api";


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
    venue: string,
    eventDate: string,
}
 
const Fixtures: React.FC<FixturesProps> = () => {

    const [currentGameWeek, setCurrentGameWeek] = useState<Number>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [fixtures, setFixtures] = useState<IFixtures>();

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
                let fixtures: IFixture[] = [];
                for(let j =0; j<38; j++){
                    let fixtureRows: IFixtureRow[] = [];

                    for(let i=0+j*10; i<10; i++){

                        let {
                            homeTeam: {logo: homeTeamLogo, team_name: homeTeamName},
                            awayTeam: {logo: awayTeamLogo, team_name: awayTeamName},
                            venue, event_date, goalsHomeTeam, goalsAwayTeam
                        } = res[i];
    
                        let fixtureRow: IFixtureRow = {
                            homeTeamName: homeTeamName,
                            homeTeamLogo: homeTeamLogo,
                            homeTeamGoals: parseInt(goalsHomeTeam),
                            awayTeamName: awayTeamName,
                            awayTeamLogo: awayTeamLogo,
                            awayTeamGoals: parseInt(goalsAwayTeam),
                            venue: venue,
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

                console.log(finalFixtures.fixtures[0].fixture)
                setFixtures(finalFixtures);

                console.log(res);
            } catch (error) {
                console.log(error)
            }
        }

        getCurrentGameWeekAsync();
        getUpcomingEPLFixturesAsync();
        setIsLoading(false);

    }, [])

    // const fixtureRow = () => {
    //     return <div className="fixtureRow">
    //                 <div className="homeTeam">
    //                     <img src="${homeTeamLogo}" alt="" >
    //                     <p>{homeTeamName}}</p>
    //                 </div>
    //                 <div className="fixtureDetails">
    //                     ${goalsHomeTeam == null ||  goalsAwayTeam == null ? '' : `<div className="scores">${goalsHomeTeam} - ${goalsAwayTeam}</div>`  }
    //                     <div className="datetime">${moment(event_date).format('ddd, MMM do @ hA')}</div>
    //                     <div className="venue">${venue}</div>
    //                 </div>
    //                 <div className="awayTeam">
    //                     <p>${awayTeamName}</p>
    //                     <img src="${awayTeamLogo}" alt="" >
    //                 </div>
    //             </div>
    // }

    return ( 
        <div>
            Fixtures Page
            <div className="block">
                <div className="title">
                    Upcoming EPL Fixtures
                </div>
                <div className="content">

                </div>
            </div>
            
        </div>
     );
}
 
export default Fixtures;