import * as React from 'react';
import { useEffect, useState } from 'react';
import { getLeagueTable } from "../../helpers/api";
import { teamData } from '../../helpers/teamdata';

export interface LeagueTableProps {
    
}

interface ILeagueTable {
    rank: number,
    logo: string,
    teamName: string,
    form: string, 
    played: number,
    goalDiff: number, 
    points: number,
}

const LeagueTable: React.FC<LeagueTableProps> = () => {

    const [leagueTable, setLeagueTable] = useState<ILeagueTable[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    
    useEffect(()=>{
        const getLeagueTableAsync = async () => {
            try{
                let response: any = await getLeagueTable();
                let tempLeagueTable: ILeagueTable[] = [];
                response.map(tableRow => {
                    let {rank, logo, teamName, forme, all: {matchsPlayed}, goalsDiff, points} = tableRow;
                    let tempRow: ILeagueTable = {
                        rank: rank,
                        logo: logo,
                        teamName: teamName,
                        form: forme,
                        played: matchsPlayed,
                        goalDiff: goalsDiff,
                        points: points
                    }
                    tempLeagueTable.push(tempRow);
                });
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
        <div></div>
     );
}
 
export default LeagueTable;