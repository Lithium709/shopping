import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import * as _ from "lodash";

import { productService } from '../../lib/service/product.service';
import { Category } from '../../lib/service/data/category';
import { Size } from '../../lib/service/data/size';
import { Color } from '../../lib/service/data/color';
import { Product } from '../../lib/service/data/product';
import {MenuCategory} from "../../lib/service/data/MenuCategory";

@Component({
    selector: 'app-main',
    templateUrl: './product1.component.html',
    styleUrls: ['./product1.component.scss']
})
export class product1Component implements OnInit {
    public search: string = null;
    public price: number;
    public page: number;
    public category: string;
    public menuCategoryName:string;
    public menuCategory:MenuCategory;
    public sizes: any;
    public styles: any;
    public collections: any;
    public patterns: any;
    public color: string;
    public valueSearch: string = '';
    private objectNavigation = {};
    public currentPage: number = 1;
    private navigateRoute = 'catalog';
    public sort : any;
    public SIZE:number;
    arraySize = [];
    arrayStyle =[];
    arrayPattern=[];
    arrayCollection=[];
    //@Input() search: string;
    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private productService: productService
    ){
            this.SIZE = this.productService.getQuerySize();
            this.activeRoute.queryParams.subscribe(params => {
                this.search = (params["search"]);
                this.price = Number(params["price"]);
                this.category = (params["category"]);
                this.menuCategoryName = params["menuCategory"];
                this.color = params["color"];
                this.sort = {price: params["sort"]};
                // Pagination
                if(!isNaN(params["page"])){
                    this.currentPage = Number(params["page"]);
                }else{
                    this.currentPage = 1;
                }

                if(params["size"] != undefined){
                    this.sizes = params["size"].split('-');
                     _.merge(this.arraySize, this.sizes);
                }else{
                    this.sizes = null;
                }

                if(params["style"] != undefined){
                    this.styles = params["style"].split('-');
                    _.merge(this.arrayStyle, this.styles);
                }else{
                    this.styles = null;
                }

                if(params["pattern"] != undefined){
                    this.patterns = params["pattern"].split('-');
                    _.merge(this.arrayPattern, this.patterns);
                }else{
                    this.patterns = null;
                }

                if(params["collection"] != undefined){
                    this.collections = params["collection"].split('-');
                    _.merge(this.arrayCollection, this.collections);
                }else{
                    this.collections = null;
                }
                if(!_.isEmpty(params)){
                    // Merge Object on init
                    _.merge(this.objectNavigation, params);

                    // Value Search
                    if(this.search != undefined){
                        this.valueSearch = this.search;
                    }
    /*
                    // Value Price
                    if(!isNaN(this.price)){
                        this.priceToggle = true;
                    }
                    */
                }

                this.productService.getMenuCategoryByName(this.menuCategoryName).subscribe((data:any)=>{
                    this.menuCategory = data[0];
                });
        });
    }
    
    ngOnInit(){

    }


    // On Page Change
    onPageChange(e){
        this.productService.onPageChange(e);
    }
}
