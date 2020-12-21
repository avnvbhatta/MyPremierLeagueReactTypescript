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
    let response = await axios.post('https://mypremierleague-server.herokuapp.com/login', loginData)
    return response;
}

export const signUp = async(signUpData: ISignUpData) => {
    const {name, email, password, teamID} = signUpData;
    let response = await axios.post('http://localhost:3008/signup', signUpData)
    return response;
}