import { Injectable } from '@angular/core';
import {CSRFService} from "../auth/csrf.service";
import { environment } from './../../environments/environment';

@Injectable()
export class SocialService {
    private authBase : string = environment.authUrl;
    constructor( private csrfService: CSRFService
                 ) {}

    getProviderSetting(provider) {
        switch (provider) {
            case 'google': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
            case 'facebook': return 'public_profile,email';
            case 'instagram': return 'public_content';
            case 'twitter': return '';
            // jhipster-needle-add-social-button
            default: return 'Provider setting not defined';
        }
    }

    getProviderURL(provider) {

       return this.authBase + '/signin/' + provider;
        // DEBUG
      // return 'http://localhost:8080'+ '/signin/' + provider;
    }

    getCSRF(){
        return this.csrfService.getCSRF();
    }
}