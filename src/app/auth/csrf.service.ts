import { Injectable } from '@angular/core';
import {CookieService} from '../lib/service/cookie.service';

@Injectable()
export class CSRFService {

    constructor(private cookieService: CookieService) {}

    getCSRF(name?: string) {
        name = `${name ? name : 'XSRF-TOKEN'}`;
        return this.cookieService[name];
    }
}