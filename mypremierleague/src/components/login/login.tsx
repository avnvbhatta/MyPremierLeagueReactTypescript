import * as React from 'react';
import { useState } from 'react';
import {ILoginData, logIn} from "../../helpers/auth";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {IUserToken} from '../../helpers/useToken';
import AppLogo from "../../images/applogo.svg";

export interface LoginProps extends RouteComponentProps{
    setToken: (userToken: IUserToken) => void; 
}
 
const Login: React.FC<LoginProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData: ILoginData = {
            email: email,
            password: password
        }
        
        try {
            let response = await logIn(loginData);
            let {name, teamID, _id } = response?.data.data;
            let token: IUserToken = {
                id: _id,
                name: name,
                teamID: teamID
            }
            props.setToken(token);
            props.history.push('/home');
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div className="login-container">
            <div className="logo">
                <img src={AppLogo} alt="applogo"/>
            </div>
            <form action="">
                <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="password"  onChange={e => setPassword(e.target.value)} required/>
                <button onClick={e => handleSubmit(e)}>Login</button>
                <div>Don't have an account? <Link to="/signup">Sign Up</Link></div>
            </form>
           
        </div>
        
     );
}

 
export default withRouter(Login);