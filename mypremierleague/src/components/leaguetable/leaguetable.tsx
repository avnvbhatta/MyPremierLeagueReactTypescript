import * as React from 'react';
import { useEffect, useState } from 'react';
import { getLeagueTable } from "../../helpers/api";
import { teamData } from '../../helpers/teamdata';
import Loading from '../loading/loading';
import LeagueTableRow from './leageTableRow';
import "./leagueTable.scss";

export interface LeagueTableProps {
    
}

interface ILeagueTable {
    table: ILeagueTableRow[]
}

interface ILeagueTableRow {
    rank: number,
    logo: string,
    teamName: string,
    played: number,
    goalDiff: number, 
    points: number,
}

const LeagueTable: React.FC<LeagueTableProps> = () => {

    const [leagueTable, setLeagueTable] = useState<ILeagueTable>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    useEffect(()=>{
        const getLeagueTableAsync = async () => {
            try{
                let response: any = await getLeagueTable();
                let tempLeagueTableRows: ILeagueTableRow[] = [];
                
                response.map(tableRow => {
                    let {rank, logo, teamName, all: {matchsPlayed}, goalsDiff, points} = tableRow;
                    let tempRow: ILeagueTableRow = {
                        rank: rank,
                        logo: logo,
                        teamName: teamName,
                        played: matchsPlayed,
                        goalDiff: goalsDiff,
                        points: points
                    }
                    tempLeagueTableRows.push(tempRow);
                });
                let tempLeagueTable: ILeagueTable = {
                    table: tempLeagueTableRows
                }
                setLeagueTable(tempLeagueTable);
                setIsLoading(false);
            }
            catch(error){
                console.log(error);
            }
        }
        getLeagueTableAsync();

    }, [])
    return ( 
        <div className="block leagueTable">
            <div className="title">EPL Table</div>
            <div className="content">
                {isLoading ? <Loading /> : 
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>P</th>
                                <th>GD</th>
                                <th>PTS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leagueTable?.table.map((leagueTableRow, idx) => {
                                return <LeagueTableRow key={idx} leagueTableRow={leagueTableRow}/>
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </div>
     );
}
 
export default LeagueTable;