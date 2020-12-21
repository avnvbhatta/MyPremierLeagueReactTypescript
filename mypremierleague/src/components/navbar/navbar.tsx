import * as React from 'react';
import { BrowserRouter as Router, Link  } from "react-router-dom";


export interface NavBarProps {
    
}
 
const NavBar: React.FC<NavBarProps> = () => {
    return ( 
        <div>
            <div className="logo"></div>
            <div className="navs">
                <Link to="/home">Home</Link>
                <Link to="/fixtures">Fixture</Link>
                <Link to="/stats">Stats</Link>
            </div>
        </div>
     );
}
 
export default NavBar;