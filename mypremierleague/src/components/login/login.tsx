import * as React from 'react';
import { useState } from 'react';
import {ILoginData, logIn} from "../../helpers/auth"
export interface LoginProps {
    
}
 
const Login: React.FC<LoginProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData: ILoginData = {
            email: email,
            password: password
        }
        
        let response = await logIn(loginData);
        console.log(response);
        e.resetForm();


    }
    return ( 
        <form action="">
            <input type="text" name="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="password"  onChange={e => setPassword(e.target.value)}/>
            <button onClick={e => handleSubmit(e)}>Login</button>
        </form>
     );
}
 
export default Login;