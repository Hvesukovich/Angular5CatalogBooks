import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestService {

    private serverUrl = 'http://ydalitTestLaravel5AndAngular5/';

    constructor(private httpClient: HttpClient) {
    }

    /***
     * Создание и редактирование пользователя
     */
    public saveUser(userInfo: IUserInfo) {
        const url = this.serverUrl + 'api/save-user';
        return this.httpClient.post(url, userInfo);
    }

}

interface IUserInfo {
    id?: number;
    login: string;
    email: string;
    password: string;
}
