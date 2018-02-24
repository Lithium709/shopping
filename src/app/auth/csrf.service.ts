import { Injectable } from '@angular/core';
import {ShopCookieService} from '../lib/service/cookie.service';

@Injectable()
export class CSRFService {

    constructor(private cookieService: ShopCookieService) {}

    getCSRF(name?: string) {
        name = `${name ? name : 'XSRF-TOKEN'}`;
        return this.cookieService[name];
    }
}