import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../auth/account.service";

@Component({
  selector: 'app-remember',
    templateUrl: './remember.component.html',
    styleUrls: ['./remember.component.scss']
})
export class RememberComponent implements OnInit {
  // formRef: any;
  public email:string;
  public exists:boolean = true;
  public reset:boolean = false;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  isFilled(){
    return  this.email;
  }

  resetPassword(){
    console.log(this.email);
    this.accountService.resetPassword(this.email).subscribe((data)=>{
      console.log(data);
        this.exists = true;
        this.reset = true;
    }, (data)=>{
      console.log("Такий імейл не існує!");
        this.exists = false;
    });
  }

}
