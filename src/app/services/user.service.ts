import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { USERS_ROUTE } from 'src/app/constants/routes';
import { User } from 'src/app/interfaces/user.interface';

const IMAGE_URL_REFIX = 'data:image/jpg;base64,';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // Init of our user data observable so it can be used in the sub pages
    private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private user: User;

    get getCurrentuser$(): BehaviorSubject<User> {
        return this.currentUser$;
    }

    getUserById(id: number): Promise<void> {
        return axios.get(`${USERS_ROUTE}?id=${id}`).then(response => {
            return this.readUserAvatar(response.data);
        }).then(userAvatar => {
            this.currentUserData = userAvatar;
        });
    }

    updateUser(user: FormData): Promise<void> {
        // Wanted to use PUT here, since it's an update in the databse, but the PHP server cannot get the image data if the request is set as PUT. Had to use POST.
        return axios.post(USERS_ROUTE, user).then(response => {
            return this.readUserAvatar(response.data);
        }).then(userAvatar => {
            this.currentUserData = userAvatar;
        });
    }

    private set currentUserData(userAvatar: string) {
        this.user.image = userAvatar;
        this.currentUser$.next(this.user);
    }

    private readUserAvatar(user: User): Promise<string> {
        this.user = user;

        if (this.user.image) {
            const imageBlob = new Blob([user.image], { type: 'image/jpg' }); // Need to create a blob from the received data, so the reader can work with it

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsText(imageBlob);

                reader.onerror = reject;
                reader.onloadend = () => {
                    return resolve(`${IMAGE_URL_REFIX}${reader.result}`); // 
                }
            });
        }
        
        return null;
    }
}
