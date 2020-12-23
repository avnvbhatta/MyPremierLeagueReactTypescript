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
    try {
        let response = await axios.post('http://localhost:3008/login', loginData)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const signUp = async(signUpData: ISignUpData) => {
    try {
        let response = await axios.post('http://localhost:3008/signup', signUpData)
        return response;
    } catch (error) {
        console.log(error);
    }
}