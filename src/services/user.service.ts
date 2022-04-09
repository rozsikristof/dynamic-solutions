import { Injectable } from '@angular/core';
import axios from 'axios';
import { USERS_ROUTE } from 'src/app/constants/routes';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    getUserById(id: number): Promise<User> {
        return axios.get(`${USERS_ROUTE}?id=${id}&image=false`).then(response => response.data);
    }

    getUserAvatarById(id: number): Promise<any> {
        return axios.get(`${USERS_ROUTE}?id=${id}&image=true`, {
            responseType: 'blob'
        }).then(response =>  new Blob([response.data._body], { type: 'image/jpg' }));
    }

    updateUser(user: FormData): Promise<User> {
        return axios.post(USERS_ROUTE, user).then(response => response.data);
    }
}
