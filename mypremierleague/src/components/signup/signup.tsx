import * as React from 'react';
import { useState } from 'react';
import {teamData} from "../../helpers/teamdata";
import {ISignUpData, signUp} from "../../helpers/auth"

export interface SignUpProps {
    
}
 
const SignUp: React.FC<SignUpProps> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teamID, setTeamID] = useState(33);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signUpData: ISignUpData = {
            name: name,
            email: email,
            password: password,
            teamID: teamID
        }
        let response = await signUp(signUpData);
        e.resetForm();
        console.log(response);

    }

    return ( 
        <form action="">
            <input type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required/>
            <input type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
            <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} required/>
            <select name="teamIDSelect" onChange={e => setTeamID(parseInt(e.target.value))} required>
                {Object.entries(teamData).map(([key, value]) => {
                    return <option value={key} key={key}>{value.name}</option>
                })}
            </select>
            <button onClick={e => handleSubmit(e)}>Sign Up</button>
        </form>
     );
}
 
export default SignUp;