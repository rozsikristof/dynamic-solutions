import { Injectable } from '@angular/core';
import axios from 'axios';
import { USERS_ROUTE } from 'src/app/constants/routes';
import { User } from 'src/app/interfaces/user.interface';

const IMAGE_URL_REFIX = 'data:image/jpg;base64,';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: User;

    getUserById(id: number): Promise<User> {
        return axios.get(`${USERS_ROUTE}?id=${id}`).then(response => {
            this.user = response.data;
            const imageBlob = new Blob([response.data.image], { type: 'image/jpg' });
           
            return this.readUserAvatar(imageBlob);
        }).then(userAvatar => {
            this.user.image = userAvatar;
            return this.user;
        });
    }

    updateUser(user: FormData): Promise<User> {
        // Wanted to use PUT here, since it's an update in the databse, but the PHP server cannot get the data if the request is set as PUT. Had to use POST.
        return axios.post(USERS_ROUTE, user).then(response => response.data);
    }

    private readUserAvatar(imageBlob: Blob): any {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(imageBlob);

            reader.onerror = reject;
            reader.onloadend = () => {
                return resolve(`${IMAGE_URL_REFIX}${reader.result}`);
            }
        });
    }
}
