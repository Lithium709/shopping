import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {productService} from "../../lib/service/product.service";
import {Category} from "../../lib/service/data/category";
import * as _ from "lodash";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Color} from "../../lib/service/data/color";
import {Size} from "../../lib/service/data/size";
import {MenuCategory} from "../../lib/service/data/MenuCategory";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-topfilter',
  templateUrl: './topfilter.component.html',
  styleUrls: ['./topfilter.component.scss']
})
export class TopfilterComponent implements OnInit {

    public menuCategory:MenuCategory;
    public menuCategoryName:string;
    public search: string = null;
    public price: number;
    public page: number;
    public category: string;
    public sizes: any;
    public color: string;
    public sort : any;

    isDesc = false;
    isAsc = false;

    public valueSearch: string = '';
    private objectNavigation = {};
    public currentPage: number = 1;
    private order : string = "";
    private navigateRoute = 'catalog';
    public priceSortOptions = [{value:'asc', viewValue:'Від дешевих до дорогих'},
                               {value:'desc', viewValue:'Від дорогих до дешевих'}
    ];
    public categories: Category[] = [];
    constructor(private router: Router,
              private productService: productService,
              private activeRoute: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {



    }

  ngOnInit() {


      this.activeRoute.queryParams.subscribe(params => {

          this.objectNavigation = {};
          this.search = (params["search"]);
          this.price = Number(params["price"]);
          this.category = (params["category"]);
          if(params["menuCategory"]!==this.menuCategory){
              this.arraySize = [];
          }
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
          }

          // Fetch init
          let filter = {
              search: this.search,
              category: this.category,
              menuCategory: this.menuCategoryName
          };
          //this.fetchCategory();
          this.fetchSize(filter);
          this.fetchColor(filter);
          this.fetchStyle(filter);
          this.fetchPattern(filter);
          this.fetchCollection(filter);
          this.productService.getMenuCategoryByName(this.menuCategoryName).subscribe((data:any)=>{
              this.menuCategory = data[0];
          });

      });


      // Check Category
      /*
      if(this.chekCategory == ''){
          this.allCategory = true;
      }
      */

      this.productService.searchClicked.subscribe($event=> {
          this.valueSearch = $event.target.value;
          this.onSearch($event);
      });

      this.productService.pageChanged.subscribe($event=> {

         let navSize: NavigationExtras = {
              queryParams: this.objectNavigation
          };
          this.objectNavigation['page'] = $event;
          this.router.navigate([this.navigateRoute], navSize);
      });
    }

    clicked(event) {
        if (isPlatformBrowser(this.platformId)) {
            document.getElementById("megamenu").style.display = "block";
        }
    }

    onSearch(e){
        delete this.objectNavigation['category'];
        delete this.objectNavigation['menuCategory'];
        delete this.objectNavigation['color'];
        delete this.objectNavigation['size'];
        delete this.objectNavigation['pattern'];
        delete this.objectNavigation['style'];
        delete this.objectNavigation['collection'];
        // delete this.objectNavigation['menuCategory'];
        let navSearch: NavigationExtras = {
            queryParams: this.objectNavigation
        };
        if(e.target.value.length !== 0){
            this.objectNavigation['search'] = e.target.value.toString().split(' ').join('-');
            delete this.objectNavigation['page'];
            this.router.navigate([this.navigateRoute], navSearch);
        }else{
            delete this.objectNavigation['search'];
            delete this.objectNavigation['page'];
            this.router.navigate([this.navigateRoute], navSearch);
        }
    }

    // Category
    //public allCategory: boolean;
    //private selectedCategory: Category;
    //private chekCategory: string = _.lowerCase(this.activeRoute.queryParams['_value'].category);

  fetchCategory(){
        this.productService.getCategory().subscribe(data => {
            var flags  = {};
            this.categories = data.filter(c=>c.parent !== null && c.parent.parent !== null ).filter(function(entry) {
                if (flags[entry.description]) {
                    return false;
                }
                flags[entry.description] = true;
                return true;
            });
            this.initCategory(data)
        });
    }

    initCategory(obj: Category[]){
      /*
        if(this.chekCategory !== undefined){
            this.selectedCategory = _.find(obj, (o) => {
                return o.description == this.chekCategory
            });
        }
        */
    }

    selectCategory(e){
        //this.selectedCategory =  e;
        //this.allCategory = false;
        let navCategory: NavigationExtras = {
            queryParams: this.objectNavigation
        };
        this.objectNavigation['category'] = e.description.split(' ').join('-');
        delete this.objectNavigation['page'];
        this.router.navigate([this.navigateRoute], navCategory);
    }


    resetFilter(){
        this.arraySize = [];
        delete this.objectNavigation['search'];
        delete this.objectNavigation['color'];
        delete this.objectNavigation['size'];
        delete this.objectNavigation['pattern'];
        delete this.objectNavigation['collection'];
        delete this.objectNavigation['style'];
        this.resetCategory();
    }

    resetCategory(){
        //this.selectedCategory = null;
        //this.allCategory = true;
        let clearCategory: NavigationExtras = {
            queryParams: this.objectNavigation
        };
        delete this.objectNavigation['category'];
        delete this.objectNavigation['page'];
        this.router.navigate([this.navigateRoute], clearCategory);
    }
    // Color
    public colors: Color[] = [];
    public styles: string[] = [];
    public patterns: string[] = [];
    public collections: string[] = [];
    public selectedColor: Color;

    fetchColor(filter){
        this.productService.getColors(filter).subscribe(data => {
            this.colors = data,
                this.initColor(data)
        });
    }

    initColor(obj: Color[]){
        if(this.color !== undefined){
            this.selectedColor = _.find(obj, (o) => {
                return o.nameColor == this.color
            });
        }
    }
    selectColor(val){
        if( this.selectedColor == val){
            this.selectedColor = null;
            let clearColor: NavigationExtras = {
                queryParams: this.objectNavigation
            };
            delete this.objectNavigation['color'];
            delete this.objectNavigation['page'];
            this.router.navigate([this.navigateRoute], clearColor);
        }else{
            this.selectedColor = val;
            let navColor: NavigationExtras = {
                queryParams: this.objectNavigation
            };
            this.objectNavigation['color'] = val.nameColor;
            delete this.objectNavigation['page'];
            this.router.navigate([this.navigateRoute], navColor);
        }
    }


    sortByPrice(){
        if(!this.order || this.order == 'desc'){
            this.order = 'asc';
            this.isAsc = true;
            this.isDesc = false;
        }
        else {
            this.order = 'desc';
            this.isDesc = true;
            this.isAsc = false;
        }
        delete this.objectNavigation['sort'];
        delete this.objectNavigation['page'];
        this.objectNavigation['sort'] = this.order;
        this.router.navigate([this.navigateRoute],  {
            queryParams: this.objectNavigation
        });
    }

    // Size Product
    public sizeProduct: Size[] = [];
    public styleProduct: any[] = [];
    public patternProduct: any[] = [];
    public collectionProduct: any[] = [];

    fetchSize(filter){
        this.productService.getSizes(filter).subscribe(data => {
            this.sizeProduct = data,
                this.initSize()
        });
    }

    fetchStyle(filter){
        this.productService.getStyles(filter).subscribe(data => {
            this.styleProduct = data;
            this.initStyle();
        });
    }

    fetchCollection(filter){
        this.productService.getCollections(filter).subscribe(data => {
            this.collectionProduct = data.filter(c=>c.value.length>1);
            this.initCollection();
        });
    }

    fetchPattern(filter){
        this.productService.getPatterns(filter).subscribe(data => {
           this.patternProduct = data;
           this.initPattern();
        });
    }

    initSize(){
        /*
        console.log("Init SIZES!!!");
        for(let i=0; i<this.sizeProduct.length; i++){
            let checkSize = _.find(this.sizes, (e) =>{
                return this.sizeProduct[i].size == e
            });
            console.log("Checked " + checkSize);
            if(checkSize != undefined){
                this.sizeProduct[i].check = true;
            }
        }
        */
        this.initProperty(this.sizeProduct, this.sizes);
    }

    initStyle(){
        this.initProperty(this.styleProduct, this.styles);
    }
    initPattern(){
        this.initProperty(this.patternProduct, this.patterns);
    }
    initCollection(){
        this.initProperty(this.collectionProduct, this.collections);
    }

    initProperty(selectedArray: any[], array: any[]){
       for(let i=0; i<selectedArray.length; i++){
            let checkSize = _.find(array, (e) =>{
                return selectedArray[i].value.toUpperCase() == e.toUpperCase()
            });
             if(checkSize != undefined){
                selectedArray[i].check = true;
            }
        }
    }

    arraySize = [];
    selectSize(size,check){
        this.selectProperty(this.arraySize, "size", size, check);
    }

    arrayStyle = [];
    selectStyle(style,check){
        this.selectProperty(this.arrayStyle, "style", style, check);
    }

    arrayPattern = [];
    selectPattern(pattern, check){
        this.selectProperty(this.arrayPattern, "pattern", pattern, check);
    }

    arrayCollection = [];
    selectCollection(collection, check){
        this.selectProperty(this.arrayCollection, "collection", collection, check);
    }

    selectProperty(selectedArray:any[], propertyName:string, property:any, check:boolean){
        if(check == false){
            selectedArray.push(property);
        }else{
            let index = selectedArray.indexOf(property);
            selectedArray.splice(index, 1);
        }

        if(selectedArray.length != 0){
            let navSize: NavigationExtras = {
                queryParams: this.objectNavigation
            };
            this.objectNavigation[propertyName] = JSON.stringify(selectedArray).split(' ').join('-');
            delete this.objectNavigation['page'];
            this.router.navigate([this.navigateRoute], navSize);
        }else{
            let clearSize: NavigationExtras = {
                queryParams: this.objectNavigation
            };
            delete this.objectNavigation[propertyName];
            delete this.objectNavigation['page'];
            this.router.navigate([this.navigateRoute], clearSize);
        }
    }

}
