import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import {HttpClient} from "@angular/common/http";
@Injectable()
export class Register {
    private authBase: string = environment.authUrl;
    constructor(private http: HttpClient) {}

    save(account: any): Observable<any> {
        return this.http.post(this.authBase + '/api/register', account);
    }
}