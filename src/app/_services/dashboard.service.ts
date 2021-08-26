import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Docs, User, Company } from '../_models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public docs: Observable<Docs>;
    public company: Observable<Company>

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // login(username: string, password: string) {
    //     return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
    //         .pipe(map(user => {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify(user));
    //             this.currentUserSubject.next(user);
    //             return user;
    //         }));
    // }

    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    //     this.currentUserSubject.next(null);
    // }

    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    docsCompany(url: string) {
        return this.http.get<Company>(environment.apiUrl + url).pipe(map(doc => {return doc}))
    }

    sign(url: string, companyId: string, params: object) {
        return this.http.post<any>(environment.apiUrl + url, { companyId, params }).pipe(map(sign => { return sign}))
    }
}
