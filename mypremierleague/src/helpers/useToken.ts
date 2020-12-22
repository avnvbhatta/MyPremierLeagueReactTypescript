import { useState } from 'react';

export interface IUserToken {
    id: string,
    name: string,
    teamID: number
}
export const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if(tokenString === null){
            return null;
        }
        const userToken: IUserToken = JSON.parse(tokenString);
        return userToken;
    };
    
    const [token, setToken] = useState<IUserToken | null>(getToken());

    const saveToken = (userToken: IUserToken | null) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }

}