import * as React from 'react';
import {Link, RouteComponentProps, withRouter } from "react-router-dom";
import {IUserToken} from '../../helpers/useToken';
import "./navbar.scss"
import MenuButton from "../../images/menu.png";
import { useEffect, useState } from 'react';
import { teamData } from '../../helpers/teamdata';

export interface NavBarProps extends RouteComponentProps {
    teamID: number,
    setToken: (userToken: IUserToken | null) => void; 
}
 
const NavBar: React.FC<NavBarProps> = ({setToken, teamID, history}) => {

    const [showMenu, setShowMenu] = useState<Boolean>(true);
    const toggleDrawer = () =>{
        console.log(showMenu)
        setShowMenu(!showMenu);
    }

    //handle sign out
    const handleSignOut = () => {
        setToken(null);
        sessionStorage.removeItem('token');
        history.push('/login');
    }

    const handleNavClick = () =>{
        setShowMenu(!showMenu);

    }

    const Navs = () => {
        return <div className="navs">
                    <Link to="/home" onClick={() => handleNavClick()}>Home</Link>
                    <Link to="/fixtures" onClick={() => handleNavClick()}>Fixtures</Link>
                    <Link to="/stats" onClick={() => handleNavClick()}>Stats</Link>
                    <div onClick={handleSignOut}>Sign Out</div>
                </div>
    }

    const teamLogo = teamData[teamID].logo;
    const setBodyBackground = () => {
        document.getElementsByTagName('body')[0].style.backgroundColor = teamData[teamID].colors;
    }

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.backgroundColor = teamData[teamID].colors;

    }, [])
    return ( 
        <>
            <div className="container">
                <div className="logo">
                    <img src={teamLogo} alt="teamLogo"/>
                </div>
                <div className="navbar">
                    <Navs />
                </div>
                <img className="menuButton" src={MenuButton} alt="menuButton" onClick={toggleDrawer}/>
            </div>
            {!showMenu && <Navs />}

        </>
        
     );
}
 
export default withRouter (NavBar);