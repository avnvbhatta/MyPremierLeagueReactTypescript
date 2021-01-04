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
 
const NavBar: React.FC<NavBarProps> = ({setToken, teamID, history, location}) => {

    const [showMenu, setShowMenu] = useState<Boolean>(true);
    const toggleDrawer = () =>{
        setShowMenu(!showMenu);
    }

    //handle sign out
    const handleSignOut = () => {
        setToken(null);
        sessionStorage.removeItem('token');
        document.getElementsByTagName('body')[0].style.backgroundColor = teamData[teamID].colors;
        history.push('/login');
    }

    const handleNavClick = () =>{
        setShowMenu(true); 
    }

    const Navs = () => {
        return <div className="navs">
                    <Link to="/home" onClick={() => handleNavClick()}>Home{location.pathname === '/home' && <div className="underline"></div>}</Link>
                    <Link to="/fixtures" onClick={() => handleNavClick()}>Fixtures{location.pathname === '/fixtures' && <div className="underline"></div>}</Link>
                    <Link to="/stats" onClick={() => handleNavClick()}>Stats{location.pathname === '/stats' && <div className="underline"></div>}</Link>
                    <div onClick={handleSignOut}>Sign Out</div>
                </div>
    }

    const teamLogo = teamData[teamID].logo;

    useEffect(() => {
        document.getElementsByTagName('body')[0].style.backgroundColor = teamData[teamID].colors;
    }, [])

    useEffect(() => {

    }, [location.pathname])
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