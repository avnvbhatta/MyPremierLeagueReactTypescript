import * as React from 'react';
import moment from "moment";
import "./fixtureRow.scss";

export interface FixtureRowProps {
    fixtureRow: IFixtureRow
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
 
const FixtureRow: React.FC<FixtureRowProps> = ({fixtureRow}) => {
    return ( 
        <div className="fixtureRow">
                                    <div className="teams">
                                        <div className="homeTeam">
                                            <div className="info">
                                                <img className="teamLogo" src={fixtureRow.homeTeamLogo} alt="homeTeamLogo"/>
                                                <div>{fixtureRow.homeTeamName}</div>
                                            </div>
                                            <div className="score">
                                                {isNaN(fixtureRow.homeTeamGoals) ? '' : fixtureRow.homeTeamGoals}
                                            </div>
                                        </div>
                                        <div className="event-full">
                                            <div className="score">
                                                {isNaN(fixtureRow.homeTeamGoals) || isNaN(fixtureRow.awayTeamGoals) ? '-': `${fixtureRow.homeTeamGoals} - ${fixtureRow.awayTeamGoals}`}
                                            </div>
                                            <div className="date">{moment(fixtureRow.eventDate).format('ddd, MM/DD @ hA')}</div>
                                        </div>
                                        <div className="awayTeam">
                                            <div className="info">
                                                <img className="teamLogo" src={fixtureRow.awayTeamLogo} alt="awayTeamLogo"/>
                                                <div>{fixtureRow.awayTeamName}</div>
                                            </div>
                                            <div className="score">
                                                {isNaN(fixtureRow.awayTeamGoals) ? '': fixtureRow.awayTeamGoals}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event">
                                        <div className="date">{moment(fixtureRow.eventDate).format('ddd, hA')}</div>
                                        <div className="date">{moment(fixtureRow.eventDate).format('MM/DD')}</div>
                                    </div>
                                    
                                </div>
     );
}
 
export default FixtureRow;