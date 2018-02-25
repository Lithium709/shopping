import { Injectable } from '@angular/core';

import { Principal } from '../auth/principal.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';

@Injectable()
export class LoginService {

    constructor(
        private principal: Principal,
        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                console.log("on posting");
                const jwt = data.id_token;
                if(jwt){
                    this.authServerProvider.storeAuthenticationToken(jwt, credentials.rememberMe);
                    //return jwt;
                }

                this.principal.identity(true).then((account) => {
                    console.log("Logged with credentials " ,  credentials);
                    // After the login the language will be changed to
                    // the language selected by the user during his registration

                    //if (account !== null) {
                    //  this.languageService.changeLanguage(account.langKey);
                    //}
                    resolve(data);
                });
                return cb();
            }, (err) => {
                this.logout();
                reject(err);
                return cb(err);
            });
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}
