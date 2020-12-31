import  React, {useEffect, useState} from 'react';
import {getCurrentGameWeek, getUpcomingFixtures} from "../../helpers/api";
import Loading from '../loading/loading';
import moment from "moment";
import FixtureRow from '../FixtureRow/fixtureRow';
export interface UpcomingFixturesProps {
    teamID: number
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
 
const UpcomingFixtures: React.FC<UpcomingFixturesProps> = ({teamID}) => {

    const [fixtures, setFixtures] = useState<IFixture>();
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(()=>{
        const getUpcomingFixturesAsync = async () => {
            try {
                let res = await getUpcomingFixtures(teamID, 5);
                 console.log(res);
                 let fixtureRows: IFixtureRow[] = [];

                res.map(fixture => {
                    let {
                        homeTeam: {logo: homeTeamLogo, team_name: homeTeamName},
                        awayTeam: {logo: awayTeamLogo, team_name: awayTeamName},
                        event_date, goalsHomeTeam, goalsAwayTeam
                    } = fixture;

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
                })
                let fixtures: IFixture = {
                    fixture: fixtureRows
                }

                setFixtures(fixtures);
                setIsLoading(false);

            } catch (error) {
                console.log(error);
            }
            
        }

        getUpcomingFixturesAsync();

    }, [])
    
    return ( 
        <>
            <div className="block">
                <div className="title">Upcoming Fixtures</div>
                <div className="content">
                    {isLoading ? <Loading /> :
                    
                    <>
                        {fixtures?.fixture.map((fixtureRow, idx)=> {
                            return <FixtureRow fixtureRow={fixtureRow} key={idx} />
                        })}
                    </>
                    }
                </div>
            </div>
        </>
     );
}
 
export default UpcomingFixtures;