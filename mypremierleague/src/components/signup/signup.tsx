import * as React from 'react';
import { useState } from 'react';
import {teamData} from "../../helpers/teamdata";
import {ISignUpData, signUp} from "../../helpers/auth"
import {Link} from "react-router-dom";
import AppLogo from "../../images/applogo.svg";
import Loading from '../loading/loading';

export interface SignUpProps {
    
}
 
const SignUp: React.FC<SignUpProps> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teamID, setTeamID] = useState(33);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setTeamID(33);
    }

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setSuccess(false);
        setError(false);
        e.preventDefault();
        const signUpData: ISignUpData = {
            name: name,
            email: email,
            password: password,
            teamID: teamID
        }
        try {
            let response = await signUp(signUpData);
            console.log(response);
            setSuccess(true);

        } catch (error) {
            console.log(error);
            setError(true);
        }
        setIsLoading(false);
        resetForm();

    }

    

    return ( 
        <div className="login-container">
            <div className="logo">
                <img src={AppLogo} alt="applogo"/>
            </div>
            <form action="">
                <input type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required/>
                <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                <select name="teamIDSelect" onChange={e => setTeamID(parseInt(e.target.value))} required>
                    {Object.entries(teamData).map(([key, value]) => {
                        return <option value={key} key={key}>{value.name}</option>
                    })}
                </select>
                {isLoading ? <Loading /> : <button onClick={e => handleSubmit(e)}>Sign Up</button>}
                {success ? <div className="success">Signup successful!</div> : <></>}
                {error ? <div className="error">Incorrect email/password.</div> : <></>}
                <div>Already have an account? <Link to="/login">Login</Link></div>
            </form>
        </div>
     );
}
 
export default SignUp;