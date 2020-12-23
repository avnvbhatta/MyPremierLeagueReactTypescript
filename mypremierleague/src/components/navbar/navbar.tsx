import * as React from 'react';
import {Link, RouteComponentProps, withRouter } from "react-router-dom";
import {IUserToken} from '../../helpers/useToken';


export interface NavBarProps extends RouteComponentProps {
    setToken: (userToken: IUserToken | null) => void; 
}
 
const NavBar: React.FC<NavBarProps> = (props) => {
    //handle sign out
    const handleSignOut = () => {
        props.setToken(null);
        sessionStorage.removeItem('token');
        props.history.push('/login');

    }
    return ( 
        <div>
            <div className="logo"></div>
            <div className="navs">
                <Link to="/home">Home</Link>
                <Link to="/fixtures">Fixture</Link>
                <Link to="/stats">Stats</Link>
                <div onClick={handleSignOut}>Sign Out</div>

            </div>
        </div>
     );
}
 
export default withRouter (NavBar);