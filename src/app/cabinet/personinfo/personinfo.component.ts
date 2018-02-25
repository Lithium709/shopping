import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../auth/account.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-personinfo',
    templateUrl: './personinfo.component.html',
    styleUrls: ['./personinfo.component.scss']
})
export class PersoninfoComponent implements OnInit {

    public accountInfo : any;

    constructor(private account: AccountService, public snackBar: MatSnackBar) { }

    ngOnInit() {

        this.account.get().subscribe((data)=>{
            this.accountInfo = data;
        });
    }
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
    onSave(formRef:any){
        this.account.save(this.accountInfo).subscribe(()=>{
            this.openSnackBar('Дані успішно змінено', 'Done');
        },()=>{
            this.openSnackBar('Дані успішно змінено', 'Done');
        });
    }

}
