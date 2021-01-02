import * as React from 'react';
import { useState } from 'react';
import {ILoginData, logIn} from "../../helpers/auth";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {IUserToken} from '../../helpers/useToken';
import AppLogo from "../../images/applogo.svg";
import Loading from '../loading/loading';

export interface LoginProps extends RouteComponentProps{
    setToken: (userToken: IUserToken) => void; 
}
 
const Login: React.FC<LoginProps> = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = async (e) => {
        setError(false);
        setIsLoading(true);
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
            setError(true);
        }
        setIsLoading(false);

    }
    return ( 
        <div className="login-container">
            <div className="logo">
                <img src={AppLogo} alt="applogo"/>
            </div>
            <form action="">
                <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="password"  onChange={e => setPassword(e.target.value)} required/>
                {isLoading ? <Loading /> : <button onClick={e => handleSubmit(e)}>Login</button>}
                {error ? <div className="error">Incorrect email/password.</div> : <></>}
                <div>Don't have an account? <Link to="/signup">Sign Up</Link></div>
            </form>
           
        </div>
        
     );
}

 
export default withRouter(Login);