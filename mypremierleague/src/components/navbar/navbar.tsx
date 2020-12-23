import * as React from 'react';
import {Link, RouteComponentProps, withRouter } from "react-router-dom";
import {IUserToken} from '../../helpers/useToken';
import "./navbar.scss"
import MenuButton from "../../images/menu.png";
import { useState } from 'react';
export interface NavBarProps extends RouteComponentProps {
    setToken: (userToken: IUserToken | null) => void; 
}
 
const NavBar: React.FC<NavBarProps> = (props) => {

    const [showMenu, setShowMenu] = useState<Boolean>(true);
    const toggleDrawer = () =>{
        console.log(showMenu)
        setShowMenu(!showMenu);
    }

    //handle sign out
    const handleSignOut = () => {
        props.setToken(null);
        sessionStorage.removeItem('token');
        props.history.push('/login');
    }

    const Navs = () => {
        return <div className="navs">
                    <Link to="/home">Home</Link>
                    <Link to="/fixtures">Fixtures</Link>
                    <Link to="/stats">Stats</Link>
                    <div onClick={handleSignOut}>Sign Out</div>
                </div>
    }

    return ( 
        <>
            <div className="container">
                <div className="logo">logo</div>
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