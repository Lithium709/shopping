import {Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { ShopCookieService } from '../../lib/service/cookie.service';

import { Cookie } from 'ng2-cookies';
import { MatSnackBar } from '@angular/material';
import { Item } from '../../lib/service/data/item';
import { Product } from '../../lib/service/data/product';
import { productService } from '../../lib/service/product.service';


@Component({
  selector: 'app-prodslide',
  templateUrl: './prodslide.component.html',
  styleUrls: ['./prodslide.component.scss']
})
export class ProdslideComponent implements OnInit {


    public currentImg :number =0;
    public  mainImgs : any[];
    public product: Product;


    constructor(
        private activeRoute: ActivatedRoute,
        private productService: productService
    ){
        this.productService.getMainImgs().subscribe((data)=>{
            console.log('Loading main slider');
            console.log(data);
            this.mainImgs = data;
        });}

    ngOnInit() {

    }

}
