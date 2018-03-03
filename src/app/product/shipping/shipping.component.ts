import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CookieService } from '../../lib/service/cookie.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import {productService} from "../../lib/service/product.service";
import {LogisticService} from "../../lib/service/logistic.service";
import {AccountService} from "../../auth/account.service";
import {FormGroup, FormBuilder, FormControl, ReactiveFormsModule, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Observable} from "rxjs/Rx";
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { environment } from './../../../environments/environment';

declare var Wayforpay:any;
declare var md5:any;
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    options: FormGroup;
    cityControl: FormControl = new FormControl();
    filteredTowns: Observable<string[]>;
    public productsOrder = [];
    public total: number; 
    public subTotal: number; 
    private promo: string;
    public promoValue: number = 0;    
    public nottouched = true;
    public touched = false;
    
    public phone: string;
    public email: string;
    public address: string;
    public city: string;
    public zipcode: string;
    public state: string;
    public country: string;
    public firstName: string;
    public lastName: string;

    public street: string;
    public house: string;
    public flat: string;

    public regions : string[];
    public towns : any[];
    public departments : string[];

    public town :any;
    public department :any;
    public region :any;
    public deliveryChoice:string='1';

    public payOnCheckout = true;

    checks = [
        {value: 'card-0', viewValue: 'Оплата карткою Visa/Mastercard'},
        {value: 'cash-1', viewValue: 'Оплата після отримання'}
    ];


    constructor(
        private router: Router,
        private cookie: CookieService,
        public snackBar: MatSnackBar,
        fb: FormBuilder,
        private productService: productService,
        private logistic: LogisticService,
        private account: AccountService
    ) {
        this.options = fb.group({
            hideRequired: false,
          /*  floatLabel: 'auto', */
        });
    }

    isFilled(){
        let personal = this.lastName && this.firstName && this.phone;
        if(!personal){
            return false;
        }
        switch(this.deliveryChoice){
            case '1': return this.region && this.town && this.department;
            case '2': return this.region && this.town && this.street && this.street && this.flat;
            case '3': return this.region && this.town;
            default: return false;
        }
        /*
        return this.region && this.town && this.lastName && this.firstName && this.phone
            && (this.department || this.deliveryChoice!='1')
            && ((this.street && this.street && this.flat )|| this.deliveryChoice != '2');
            */
    }

    ngOnInit() {
        var products = this.cookie['productsOrder'];
        _.map(products, (x)=>{
            return x.slug = x.slug.split(' ').join('-')
        });
        this.productsOrder = products;
        this.promo = JSON.stringify(this.cookie['promo']);
        this.promoValue = this.cookie['promoValue'];
        this.subTotal = this.cookie['subtotal'];                
        this.total = this.cookie['subtotal'] - this.promoValue;  
        if(this.total < 0){
            this.total = 0;
        }
        if(this.productsOrder.length == 0){
            this.router.navigate(['/product/cart']);
        }

        this.logistic.getAreas().subscribe((data:any)=>{
            this.regions = data.data;
        });

        this.account.get().subscribe((data)=>{
            this.phone = data.phone;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
        });
    }

    onSelectArea(region){

        this.region = region;

        this.logistic.getCities().subscribe((data:any)=>{

            this.towns = data.data.filter(e=>e.Area ===region.Ref);
            this.filteredTowns = this.cityControl.valueChanges
                .pipe(
                    startWith(''),
                    map(val =>  this.filter(val))
                );

        });

    }

    filter(val): string[] {
       // console.log(this.towns.map(t=>t.Description));
        return this.towns.map(t=>t.Description).filter(option =>
            option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
    onSelectCity(){
        console.log("City =", this.city)
        if(this.city){
           let search = this.towns.filter(t=>t.Description === this.city );
           if(search.length>0){
               let c = search[0];
               this.town = c;
               this.logistic.getDepartments(c).subscribe((data:any) =>{
                   this.departments = data.data;
                   // console.log(this.departments);
               });
           }
          }
    }


    onSelectDepartment(department){
        this.department = department;
    }
    onDeliveryClick(choice:string){
        this.deliveryChoice = choice;
        this.region = undefined;
        this.town = undefined;
        this.department = undefined;
    }

    // Open Popup Checkout
    openCheckout() {
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_RdW4DTIQXiTLULbUy1vnQUsV',
            locale: 'auto',
            token: (token: any) => {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                // Documentation charge https://stripe.com/docs/charges
                console.log(token.id);
                this.cookie.addCookie('payed', 'payed');
                this.cookie.removeCookie('products');                           
                this.cookie.removeCookie('promo');                           
                this.cookie.removeCookie('promoValue');                           
                this.cookie.removeCookie('subtotal');    
                setTimeout(()=>{
                this.router.navigate(['/shop/receipt']);
                }, 1000);                      
            },
            closed : () =>{
                this.nottouched = true;
                this.touched = false;
                console.log('asd');
            }
        });
        
        // handler Open
        handler.open({
            image: '/assets/images/brand/logo-stripe.jpg',
            name: 'Angushop',
            description: 'Complete payment',
            amount: this.total
        });
    }


    // Submit
    onSubmit(form){
        console.log(form.value); // Object Shipping Object
        console.log(this.cookie['productsOrder']); // Array Obect Products order
        console.log(this.cookie['promo']); // Object Promo
        console.log(this.cookie['promoValue']); // Object Promo Value From calculation
        console.log(this.cookie['subtotal']); // Object Sub Total     
        
        this.openCheckout();

        this.nottouched = false;
        this.touched = true;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    pay(){
        // let order = this.getOrder();

        /*
       const wayforpay = new Wayforpay();
       wayforpay.run({
               merchantAccount : "test_merch_n1",
               merchantDomainName : "www.market.ua",
               authorizationType : "SimpleSignature",
               merchantSignature : "4c19ee40b5ac8c2387d79780dc3a038c",
               orderReference : "DH783044",
               orderDate : "1415379863",
               amount : "1547.36",
               currency : "UAH",
               productName : "Процессор Intel Core i5-4670 3.4GHz",
               productPrice : "1000",
               productCount : "1",
               clientFirstName : "Вася",
               clientLastName : "Васечкин",
               clientEmail : "some@mail.com",
               clientPhone: "380631234567",
               language: "UA"
           },
           function (response) {
               // on approved
           },
           function (response) {
               // on declined
           },
           function (response) {
               // on pending or in processing
           }
       );
       */
    }

    createSignature(order:any){
        return md5("test_merch_n1;www.market.ua;DH783044;1415379863;1547.36;UAH;Процессор Intel Core i5-4670 3.4GHz;1;1000",
            "flk3409refn54t54t*FNJRET");
    }

    getSignature(order, lines){
        const hashparam = [
            environment.merchantAccount,
            environment.merchantDomainName,
            "ARB" + order.id,
            Date.parse(order.orderDate)/1000,
            order.total,
            "UAH",
            lines.map(a=>a.productName).join(";"),
            lines.map(a=>a.quantity).join(";"),
            lines.map(a=>a.price).join(";")
        ].join(";");
        console.log("hash param=", hashparam)
        return md5(hashparam, environment.merchantSecretKey);
    }

    postOrder(){
        const lines = this.cookie['productsOrder'];
        console.log("lines=");
        console.log(lines);
        let order = {
            "buyer": this.firstName + ' ' + this.lastName,
            "orderDate": new Date().toISOString().slice(0,10),
            "state": "NEW",
            "cancelled": false,
            "paid": false,
            "deliveryAllowed": true,
            "delivered": false,
            "hasTroubles": false,
            "total": this.total,
            "phone": this.phone,
            "area" : this.region.Description,
            "city" : this.town.Description,
            "warehouse": this.department && this.department.Description,
            "street" : this.street,
            "house" : this.house,
            "flat" : this.flat,
            "orderLines": lines
        }
        // console.log(this.cookie['productsOrder']);
        this.productService.postOrder(order).subscribe((response)=>{
            Observable.forkJoin(order.orderLines.map(line=>this.productService.postOrderLine(response, line.item, line.quantity, line.price)))
                .subscribe(()=>{
                    if(response.status = 201) {
                        if(this.payOnCheckout){
                            const wayforpay = new Wayforpay();
                            const oneline = lines.length==1;
                            const params = {
                                merchantAccount : environment.merchantAccount,
                                merchantDomainName : environment.merchantDomainName,
                                authorizationType : "SimpleSignature",
                                merchantSignature : this.getSignature(response, lines),
                                orderReference : "ARB" + response.id,
                                orderDate : Date.parse(order.orderDate)/1000,
                                amount : response.total,
                                currency : "UAH",
                                productName : oneline?lines[0].productName:lines.map(a=>a.productName),
                                productPrice :oneline?lines[0].price      :lines.map(a=>a.price),
                                productCount :oneline?lines[0].quantity   :lines.map(a=>a.quantity),
                                clientFirstName : this.firstName,
                                clientLastName : this.lastName,
                                clientEmail : this.email,
                                clientPhone: this.phone,
                                language: "UA"
                            };
                            console.log(params);
                            wayforpay.run(params,
                                function (response) {
                                    // on approved
                                    //this.productService.postOrder(order).subscribe()
                                },
                                function (response) {
                                    // on declined
                                },
                                function (response) {
                                    // on pending or in processing
                                }
                            );
                        }
                        this.router.navigate(["/order-list"]);
                        this.productService.emailOrderAccepted(response.id);
                    }
                    this.openSnackBar('Ваше замовлення відправлено на обробку!', 'Done');
                    this.cookie.removeCookie('products');
                    this.cookie.removeCookie('promo');
                    this.cookie.removeCookie('promoValue');
                    this.cookie.removeCookie('subtotal');
                    this.productService.onEmptyCart(response);
                });
        });

    }
}
