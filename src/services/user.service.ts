import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { USERS_ROUTE } from 'src/app/constants/routes';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    getUserById(id: number): Promise<AxiosResponse> {
        return axios.get(`${USERS_ROUTE}?id=${id}`);
    }

    updateUser(user: User): Promise<AxiosResponse> {
        return axios.put(USERS_ROUTE, user );
    }
}
