import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {MatDialogRef} from "@angular/material";
import { LoginService } from './login.service';
import { StateStorageService } from '../auth/state-storage.service';
import { Router } from '@angular/router';
import { Principal } from '../auth/principal.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginDialogComponent implements OnInit {

    public password: string;
    rememberMe: boolean;
    public username: string;
    credentials: any;
    authenticationError:boolean;

    constructor(
        public thisDialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private principal: Principal,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private router: Router)
    {
        this.credentials = {};
    }

    ngOnInit() {
  }

    onCloseConfirm() {
        this.thisDialogRef.close('Confirm');
    }
    onCloseCancel() {
        this.thisDialogRef.close('Cancel');
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            //this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.thisDialogRef.close('Confirm');
            /*
            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });
            */
            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    logout(){
        this.loginService.logout();
    }

}