import { Component, OnInit } from '@angular/core';
import { productService } from '../lib/service/product.service';
import { CookieService } from '../lib/service/cookie.service';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {Principal} from "../auth/principal.service";
import {CartComponent} from "../product/cart/cart.component";
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
   /* animations: [
        trigger('toggleHeight', [
            state('inactive', style({
                height: '0',
                width: '0',
                display: 'none',
                overflow: 'hidden',
                'padding-top' :'0'
            })),
            state('active', style({
                height: '*',
                width:'*',
                display: 'block',
                'padding-top' :'*'
            })),
            transition('inactive => active', animate('400ms ease-in')),
            transition('active => inactive', animate('400ms ease-out'))
        ])
    ]*/
})


export class MenuComponent implements OnInit {


    actmenu ='';
    menuState : any = {};
    menuOpen = false;
    public productCount: number;
    public searchText: string ="";
    private  dialogResult = "";
    public imageUrl: String;
    constructor(private productService: productService,
                private cookie: CookieService,
                private router: Router,
                public dialog: MatDialog,
                private principal: Principal
    ) {

        setInterval(()=>{
            this.cookie.updateCookie();
            this.cookie.initCookie();
            this.productCount = this.cookie['productsOrder'].length;
        }, 700);

    }

    ngOnInit() {
        this.imageUrl = this.principal.getImageUrl();
        this.inactivateAll();
    }

    onClick($event) {
        this.menuOpen = !this.menuOpen;
    }

    inactivateAll(){
        this.menuState['news']="inactive";
        this.menuState['catalog']="inactive";
        this.menuState['shops']="inactive";
        this.menuState['service']="inactive";
        this.menuState['search']="inactive";
    }

    onClickMainMenu(menu:string){
        this.inactivateAll();
        if(this.actmenu == menu){
            this.actmenu = "";
        }else {
            this.actmenu = menu;
            this.menuState[menu] = 'active';
        }
    }

    openCart() {
        let dialogRef = this.dialog.open(CartComponent, {panelClass: 'myapp-no-padding-dialog'});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            this.dialogResult = result;
        });
    }

    search($event){
        this.router.navigateByUrl("/catalog");
        this.productService.onSearch($event);
    }

    SearchButtonClick(){
        this.router.navigateByUrl("/catalog");
        console.log("this.searchText");
        this.productService.onSearch({target:{value:this.searchText}});
    }


    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    loginClick() {
        this.router.navigateByUrl(this.isAuthenticated()? "/order-list": "/Login-Show" );
    }
}
