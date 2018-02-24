import { Injectable } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';
import * as _ from "lodash";

@Injectable()
export class ShopCookieService {
    public productsOrder = [];
    private arrWishList = [];
    private arrCompare = [];
    private promo: number;
    private promoValue: number;
    private subtotal: number;
    private payed: string = '';

    cookies: Object;
    keys: Array<string>;
    
    constructor(private  Cookie : CookiesService) {
        this.updateCookie();
        this.initCookie();  
    }

    // Update Cookie
    updateCookie() {
        this.cookies = this.Cookie.getAll();
        this.keys = Object.keys(this.cookies);
    }

    // Add Cookie
    addCookie(cName: string, cValue: string) {
        this.Cookie.put(cName, cValue);
        this.updateCookie();
        this.initCookie();          
    }

    // Remove Cookie
    removeCookie(name: string) {
        this.Cookie.remove(name);
        this.updateCookie();
        this.initCookie(); 
    }

    // Initialize Cookie
    initCookie(){
        if(!_.isEmpty(this.cookies)){
            this.productsOrder = [];
            this.arrWishList = [];
            this.arrCompare = [];

            // Products
            if(this.cookies['products'] != undefined){
                let productsCart = JSON.parse(this.cookies['products']);
                _.map(productsCart, (x)=>{
                    return this.productsOrder.push(x);
                });
            }
        }
    }
}
