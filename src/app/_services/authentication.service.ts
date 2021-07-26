import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(params: object) {
        // console.log(environment.apiUrl)
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { params })
            .pipe(map(user => {
                console.log(user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', JSON.stringify(user['token']['accessToken']));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    doc() {
        console.log('this')
        let header = new HttpHeaders().append(
            "Authorization",
            "Bearer " + localStorage.getItem('token')
        ) 
        // console.log(environment.apiUrl)
        return this.http.get(`${environment.apiUrl}/documents`, { headers: header })
            // .pipe(map(item => {
            //     console.log(item)
            //     // store user details and jwt token in local storage to keep user logged in between page refreshes
            //     // localStorage.setItem('currentUser', JSON.stringify(user));
            //     // localStorage.setItem('token', JSON.stringify(user['token']['accessToken']));
            //     // this.currentUserSubject.next(user);
            //     return item;
            // }));
    }
}