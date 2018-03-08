import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {Principal} from "../auth/principal.service";

@Component({
    selector: 'app-cookie-saver',
    template: ''
})
export class CookieSaverComponent implements OnInit {

    private token : string;
    constructor(private route: ActivatedRoute,
                private authProvider :AuthServerProvider,
                private router: Router,
                private principal: Principal
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params)=>{
            console.log("Token: ",params['token']);
            this.token = params['token'];

            this.authProvider.loginWithToken(this.token, false).then(
                ()=>{
                    this.principal.identity(true).then((account)=>{
                        console.log("Successfully logged in with token");
                        console.log(account);
                        this.router.navigate(['order-list']);
                    });
                },
                ()=>{
                    console.log("Rejected");
                }
            );

            //this.authProvider.storeAuthenticationToken(params['token'], true);
        });
    }

}
