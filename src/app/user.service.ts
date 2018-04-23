import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    public activeUser: string;

    constructor() {
    }

    // private saveUserInfoInLocalStorage () {
    //     const newUserFilters = JSON.parse(this.storageSrv.getItem('filters'));
    //     if (newUserFilters) {
    //         newUserFilters.view = this.userFilters.view;
    //         this.storageSrv.setItem('filters', JSON.stringify(newUserFilters));
    //     } else {
    //         this.storageSrv.setItem('filters', JSON.stringify(this.userFilters));
    //     }
    // }

    public saveUserInfoInLocalStorage(userInfo): void {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    public setActiveUser(login: string): void {
        this.activeUser = login;
    }

    public outUser(): void {
        this.activeUser = null;
        localStorage.removeItem('userInfo');
    }

}
