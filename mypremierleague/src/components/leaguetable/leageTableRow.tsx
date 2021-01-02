import * as React from 'react';
import "./leagueTable.scss";
export interface LeagueTableRowProps {
    leagueTableRow: ILeagueTableRow
}
 
interface ILeagueTableRow {
    rank: number,
    logo: string,
    teamName: string,
    played: number,
    goalDiff: number, 
    points: number,
}


const LeagueTableRow: React.SFC<LeagueTableRowProps> = ({leagueTableRow}) => {
    return ( 
        <tr className="leagueTableRow">
            <td>{leagueTableRow.rank}</td>
            <td className="team">
                <img src={leagueTableRow.logo} alt="teamLogo"/>
                <div>{leagueTableRow.teamName}</div>
            </td>
            <td>{leagueTableRow.played}</td>
            <td>{leagueTableRow.goalDiff}</td>
            <td>{leagueTableRow.points}</td>
        </tr>
     );
}
 
export default LeagueTableRow;