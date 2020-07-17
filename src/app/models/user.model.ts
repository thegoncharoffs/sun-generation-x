export interface User {
    id?: string;
    userName?: string;
    login: string;
    password: string;
    accessToken?: string;
    roles?: any[];
}