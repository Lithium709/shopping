import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {LoginService} from "../login/login.service";
import {StateStorageService} from "../auth/state-storage.service";
import {Principal} from "../auth/principal.service";
import {Router} from "@angular/router";
import { Register } from  "../auth/register.service";
import {SocialComponent} from "../social/social.component";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public firstName: string;
    public lastName: string;
    public email: string;
    public subject: string;
    public message: string;
    public password: string;
    public rememberMe: boolean = true;
    public username: string;
    private credentials: any;
    public authenticationError:boolean;
    public regPassword :string;
    public regPasswordRepeat:string;
    public registerAccount: any;
    public success: boolean;
    public phone :string;
    doNotMatch: string;
    regEmail: string;
     error: string;
    errorEmailExists: string;
    errorUserExists: string;
    constructor(
        private registerService: Register,
        public snackBar: MatSnackBar,
        private principal: Principal,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private router: Router)
    {
        this.credentials = {};
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        if(this.isAuthenticated()){
            this.redirect();
        }
        //DEBUG!!!
        /*
        this.regPassword  = this.regPasswordRepeat = "123456";
        this.regEmail = this.regEmailRepeat = "ivan.yukhim@ukr.net";
        this.fullname = "Іван Юхимович";
        this.phone = "1112242";
        */

    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
    }

    onEditPass(){
        this.authenticationError = false;
    }

    redirect(){
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
            this.stateStorageService.storeUrl(null);
            this.router.navigate(["/shipping"]);
        }
        else{
            this.router.navigate(["/order-list"]);
        }
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

           this.redirect();
           this.openSnackBar('Ви успішно авторизовані', 'Done');
           // this.router.navigateByUrl('order-list');
            /*
            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });
            */
            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState


        }).catch(() => {
            this.authenticationError = true;
        });
    }

    logout(){
        this.loginService.logout();
    }


    register() {
        console.log("Reg begin!");
        if (this.regPasswordRepeat !== this.regPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            //this.errorUserExists = null;
            this.errorEmailExists = null;
            this.registerService.save({login:this.regEmail,
                                                email: this.regEmail,
                                                password:this.regPassword
                                                ,phone: this.phone,
                                                firstName: this.firstName,
                                                lastName: this.lastName
            }).subscribe(() => {
                console.log("Successfull Registration!");
               // this.success = true;
                this.redirect();
                this.openSnackBar('Ви успішно зареєстровані', 'Done');
            }, (response) => this.processError(response));

        }
    }

    private processError(response) {

        if(response.status === 201){
            this.success = true;
            this.openSnackBar('Ви успішно зареєстровані', 'Done');
            this.router.navigateByUrl('order-list');
            return;
        }

        this.success = null;
       // if (response.status === 400 && response.type === LOGIN_ALREADY_USED_TYPE) {
        if (response.status === 400) {
            console.log("Registration failed");
            this.errorUserExists = 'ERROR';
            this.errorEmailExists = 'ERROR';
       // } else if (response.status === 400 && response.type === EMAIL_ALREADY_USED_TYPE) {
       //     this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

}
