import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppService } from './app.service';
import { environment } from 'src/environmentts/environment';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient,private appService:AppService) { }

    jwtHelperService = new JwtHelperService();

    loginUser(loginInfo: Array<string>) {
        const body = {
            "email": loginInfo[0],
            "password": loginInfo[1]
        }
        return this.http.post(this.appService.getRoute() + 'Accounts/Login', body,
            {
                responseType: 'json',
            })
    }
    setToken(token: string) {
        localStorage.setItem("access_token", token);
        this.loadCurrentUser();
    }
    loadCurrentUser() {
        const token = localStorage.getItem("access_token");
        const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;

        const data = userInfo ? {
            id: userInfo.id,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            role: userInfo.role,
            email: userInfo.Email,
        } : null;
        this.currentUser.next(data);
    }
    Isloggedin() {
        return localStorage.getItem('access_token') ? true : false;
    }
    removeToken() {
        localStorage.removeItem("access_token");
    }
    getRefreshToken() {
        return localStorage.getItem('RefreshToken');
      }
}