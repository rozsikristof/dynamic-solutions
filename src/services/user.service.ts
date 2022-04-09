import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import axios from 'axios';
import { USERS_ROUTE } from 'src/app/constants/routes';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private readonly sanitizer: DomSanitizer) {}

    getUserById(id: number): Promise<User> {
        return axios.get(`${USERS_ROUTE}?id=${id}`).then(response => response.data)
            .then(reponseData => {
                if (reponseData.img) {
                    reponseData.img = reponseData.img.replace(/\s/g, '/');

                    const imageArray = Array.from(reponseData.img);
                    const partition = reponseData.img.indexOf(':') + 1;

                    imageArray.splice(partition, 0, '/');
                    reponseData.img = this.sanitizer.bypassSecurityTrustUrl(imageArray.join(''));
                    console.log(reponseData.img);
                }

                return reponseData;
            })
    }

    updateUser(user: FormData): Promise<User> {
        return axios.post(USERS_ROUTE, user).then(response => response.data);
    }
}
