import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../auth/account.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-person-settings',
  templateUrl: './person-settings.component.html',
  styleUrls: ['./person-settings.component.scss']
})
export class PersonSettingsComponent implements OnInit {

  public password: string;
  public password2: string;
  constructor(private account: AccountService, public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
          duration: 2000,
      });
  }
  onPost(formRef:any){
    this.account.changePassword(this.password).subscribe(()=>{
          this.password = this.password2 = '';
          this.openSnackBar('Пароль успішно змінено', 'Done');
    },
        // httpClient error
        () => {
         // this.success = null;
         // this.error = 'ERROR';
        this.password = this.password2 = '';
        this.openSnackBar('Пароль успішно змінено', 'Done');
      });
  }
}
