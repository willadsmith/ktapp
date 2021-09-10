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
    
    docsCompany(url: string) {
        return this.http.get<Company>(environment.apiUrl + url).pipe(map(doc => {return doc}))
    }

    docsCompanyChange(url: string, status: string) {
        let req_url = url
        status === '' ? req_url : req_url = `${url}?status=${status}`
        return this.http.get<Company>(environment.apiUrl + req_url).pipe(map(doc => {return doc }))
    }

    sign(url: string, companyId: string, params: object) {
        return this.http.post<any>(environment.apiUrl + url, { companyId, params }).pipe(map(sign => { return sign}))
    }
}
