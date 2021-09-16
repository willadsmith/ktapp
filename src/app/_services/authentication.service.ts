﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Docs, User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public docs: Observable<Docs>;
    public user: object;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(params: object) {
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, { params })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes

                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user['token']['accessToken']);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    loginOperator(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/auth/operator`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes

                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', user['token']['accessToken']);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(companyType: string, firstName: string, lastName: string, idn: string, bin: string, email: string, middleName: string, company: string, signedXml: object) {
        return this.http.post<any>(`${environment.apiUrl}/auth/register`, { companyType, firstName, lastName, idn, bin, email, middleName, company, signedXml })
            .pipe(map(user => {
                console.log(user)
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    doc(url: string) {
      const token = localStorage.getItem('token');

        let header = new HttpHeaders().set(
            "Authorization",
            "Bearer " + token
        )
        return this.http.post<Docs>(environment.apiUrl + url, { headers: header }).pipe(map(user => { return user}))
    }

    sign(url: string, params: object) {
        return this.http.post<any>(environment.apiUrl + url, params).pipe(map(sign => { return sign}))
    }

}
