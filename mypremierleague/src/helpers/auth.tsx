import axios from "axios";

export interface ILoginData {
    email: string,
    password: string
}

export interface ISignUpData {
    name: string,
    email: string,
    password: string,
    teamID: number
}

export const logIn = async(loginData: ILoginData) => {
    const {email, password} = loginData;
    try {
        let response = await axios.post('http://localhost:3008/login', loginData)
        return response;
    } catch (error) {
        console.log(error);
    }
    
}

export const signUp = async(signUpData: ISignUpData) => {
    const {name, email, password, teamID} = signUpData;
    try {
        let response = await axios.post('http://localhost:3008/signup', signUpData)
        return response;
    } catch (error) {
        console.log(error);
    }
    
}