import { Injectable } from '@angular/core';
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

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
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

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    doc(url: string) {
        let header = new HttpHeaders().set(
            "Authorization",
            "Bearer " + localStorage.getItem('token')
        ) 
        return this.http.get<Docs>(environment.apiUrl + url, { headers: header })
    }
}