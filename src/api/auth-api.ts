import axios from "axios";
import {BaseResponse} from "./api";

type UserAuthData = {
    id: number,
    email: string,
    login: string,

}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export const authApi = {
    login: (email: string, password: string, rememberMe?: boolean) => {
        return (instance.post<BaseResponse<{ userId: number }>>('/auth/login', {email, password, rememberMe}))
    },
    logout: () => {
        return instance.delete<BaseResponse>('/auth/login');
    },
    me: () => {
        return instance.get<BaseResponse<UserAuthData>>('/auth/me');
    }
}