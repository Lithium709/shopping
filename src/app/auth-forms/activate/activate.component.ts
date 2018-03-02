import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {preserveWhitespacesDefault} from "@angular/compiler";
import {AccountService} from "../../auth/account.service";

@Component({
  selector: 'app-activate',
    templateUrl: './activate.component.html',
    styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

   private key:string;
   private activated:boolean = false;
   private error:boolean=false;

  constructor(private activeRoute: ActivatedRoute, private accountService: AccountService) {

      this.activeRoute.queryParams.subscribe(params => {
          this.key = params["key"];
          this.accountService.activate(this.key).subscribe((data)=>{
                this.activated = true;
          }, ()=>{
              this.error = true;
          });
      });


  }

  ngOnInit() {

  }

}
