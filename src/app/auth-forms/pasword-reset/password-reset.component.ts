import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../auth/account.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pasword-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  private key: string;
  public password: string;
  public password2: string;
  private success: boolean = false;
  private error:boolean = false;
  constructor(private accountService: AccountService, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params => {
        this.key = params["key"];
    });

  }

  ngOnInit() {
  }

  saveNewPassword(){
    this.accountService.newPassword(this.key, this.password).subscribe(()=>{
        this.success = true;
    }, ()=>{
        this.error = true;
    });
  }
}
