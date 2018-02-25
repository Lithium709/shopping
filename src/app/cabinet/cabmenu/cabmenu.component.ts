import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";
import {CookieService} from "../../lib/service/cookie.service";

@Component({
  selector: 'app-cabmenu',
  templateUrl: './cabmenu.component.html',
  styleUrls: ['./cabmenu.component.scss']
})
export class CabmenuComponent implements OnInit {

  public  isCartEmpty :boolean;
  constructor(private loginService: LoginService, private router: Router,
              private cookie: CookieService) {

      this.isCartEmpty = this.cookie.productsOrder.length==0;
  }

   ngOnInit() {
   }

   logout(){
     this.loginService.logout();
     this.router.navigateByUrl("/");
   }

}
