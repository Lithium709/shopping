import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
@Injectable()
export class AccountService  {
    private authBase: string = environment.authUrl;
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        return this.http.get(this.authBase + '/api/account');
    }

    save(account: any): Observable<any> {
        return this.http.post(this.authBase + '/api/account', account);
    }

    changePassword(password:string): Observable<any>{
        return this.http.post(this.authBase + '/api/account/change-password', password);
    }
}
