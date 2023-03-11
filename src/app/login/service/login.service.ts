import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { retry } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { User } from "../models/user";



@Injectable({
    providedIn: "root",
})
export class LoginService {
    baseUrl = environment.baseUrl;


    public loginStatusSubject = new Subject<boolean>();
    clearTimeout: any;

    constructor(private http: HttpClient, private toastr: ToastrService) { }



    //current user : which is loogedin
    public getCurrentUser() {
        return this.http.get(`${this.baseUrl}/currentUser`);
    }

    //generate Token
    public generateToken(loginData: any) {
        return this.http.post(`${this.baseUrl}/generateToken`, loginData);
    }

    //login user : set token in local storage
    public loginUser(token: any) {
        localStorage.setItem("token", token);
        return true;
    }

    //isLoogedIn: user is loggedin or not
    public isLoggedIn() {
        let tokenStr = localStorage.getItem("token");
        if (tokenStr == undefined || tokenStr == "" || tokenStr == null) {
            return false;
        } else {
            return true;
        }
    }






    //logout:: remove token from localstorage
    public logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("activeTabName");
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
        }
        return true;
    }



    //getToken
    public getToken() {
        return localStorage.getItem("token");
    }

    //set userDetail
    public setUser(user: any) {
        console.log("user=>" + JSON.stringify(user));
        localStorage.setItem("user", JSON.stringify(user));
    }

    //getUser
    public getUser() {
        let userStr = localStorage.getItem("user");
        if (userStr != null) {
            return JSON.parse(userStr);
        } else {
            this.logout();
            return null;
        }
    }

    //get user role
    public getLoginUserRole() {
        let userAuthorities = "";

        let loginUser = this.getUser();
        if (loginUser) {
            let authorities = loginUser.authorities;
            authorities.forEach((element: any) => {
                userAuthorities = userAuthorities + element.authority + ",";
            });
        }

        console.log("userAuthorities" + userAuthorities);
        return userAuthorities;
    }



    // Register User
    public register(user: any) {
        return this.http.post(`${this.baseUrl}/user/register`, user);
    }
    // Get By Id
    public getById(id: any) {
        return this.http.get(`${this.baseUrl}/user/get/${id}`);
    }

    sendPostRequest(apiURL: any, user: User): Observable<User> {
        return this.http.post<User>(apiURL, user);
    }

    sendPutRequest(apiURL: any, user: User): Observable<User> {
        return this.http.put<User>(apiURL, user);
    }

    public sendGetRequest(apiURL: any, queryParams: any) {
        console.log("@sendGetRequest");
        return this.http.get<any>(apiURL, { params: queryParams }).pipe(retry(3));
    }


    public mycompany() {
        return this.http.get(`${this.baseUrl}/companySettings/getAll`);
    }

    public mynotifications() {
        return this.http.get(`${this.baseUrl}/notification/notificationEmp`);
    }

    public mynotificationsnumber() {
        return this.http.get(`${this.baseUrl}/notification/getTotalUnseenNotifications`);
    }
    public mynotificationsUpdate(id: any) {
        return this.http.get(`${this.baseUrl}/notification/seenUpdate/${id}`);
    }

    sendGetRequestForMenusAuth() {
        console.log("sendGetRequestForMenusAuth");
        return this.http.get(`${this.baseUrl}/menusAuth`);
    }

    welocmeAuthentication() {
        return this.http.get(`${this.baseUrl}/test/testMessege`);
    }

}


