import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';

// Object Type
import { Product } from './data/product';
import { Logo } from './data/logo';
import { Category } from './data/category';
import { Size } from './data/size';
import { Color } from './data/color';
import {Order} from './data/order';
import {Store} from './data/Store';
import {PRODUCTS} from './products';
import {CATEGORIES} from './categories';
import {BLOGPOSTS} from './BlogPosts';
import {STORES} from './stores';
import { environment } from './../../../environments/environment';
import {Item} from "./data/item";
import {BlogPost} from "./data/BlogPost";
import {BlogCategory} from "./data/BlogCategory";
import {MenuCategory} from './data/MenuCategory';
@Injectable()
export class productService {

    public  total: number;

    private searchBase: string = environment.apiUrl;//'./assets/json/';
    public regex = /^([a-z][a-z]).(\d\d).(\d\d).(\d\d)$/g;
    private authBase : string = environment.authUrl;
    // private sbase: string = 'http://localhost:9200';
    private static readonly INDEX = '';
    // private static readonly TYPE = 'product';
    private static readonly SIZE = 99;
    orderToReturn : any;
   // private arr : string[] =[];
    searchClicked: EventEmitter<string> = new EventEmitter();
    pageChanged: EventEmitter<number> = new EventEmitter();
    addedToCart: EventEmitter<any> = new EventEmitter();
    cartIsEmptied : EventEmitter<any> = new EventEmitter();
    private  queryalldocs = {
        'size' : productService.SIZE,
        'query': {
            'match_all': {}
        }
    };

    private MENUCATEGORIES = [
        {
            "id": 2,
            "name": "Костюми",
            "position": 1
        },
        {
            "id": 3,
            "name": "Акції",
            "position": 2
        }
    ];
    getQuerySize(){
        return productService.SIZE;
    }

    constructor(protected http:HttpClient){}

    // Get Products
    getProduct(): Observable<Product[]>{
        if(environment.production){
            this.queryalldocs.size = 100;
            let resp = this.http.post(this.searchBase + '/product/_search', this.queryalldocs)
                .subscribe((r:any)=>r.hits.hits.map(o=>o._source));
        }
        return of(PRODUCTS);
    }

    getProductByItemId(itemId:number): Observable<Product>{
        let query ={
            size:1,
            "query" : {
                "constant_score" : {
                    "filter" : {
                        "term" : {
                            "items.id" : itemId
                        }
                    }
                }
            }
        };
        return this.http.post(this.searchBase + '/product/_search', query)
            .map((res:any)=>res.hits.hits[0]._source);

    }

    // Get Product By Id
    getIdProduct(id: number): Observable<any>{
        if(environment.production){
            return this.http.get(this.searchBase + '/product/product/' + id);
        }
        return this.getProduct().map(products => products.find(product => product.id === id));
    }

    // Get Product By Slug
    getSlugProduct(slug: string): Observable<Product>{
        if(environment.production){
            return this.http.get(this.searchBase + '/product/_search/?size=1&q=slug:' + slug)
            //.map((res:Response) => res.json().hits.hits[0]._source);
                .map((res:any)=>res.hits.hits[0]._source);
        }
        return this.getProduct().map(products => products.find(product => product.slug === slug));
    }

    private  getHtmlBlocks(mainMenuId:number, side: string){
        if(environment.production){

            let q = {
                "query":{
                    "constant_score": {
                        "filter": {
                            "bool" : {

                                "must" : [
                                    {"term": {"mainMenu.position": mainMenuId}},
                                    {"match": {"blockType": side}}
                                ]

                            }

                        }

                    }
                }
            };

            return this.http.post(this.searchBase + '/htmlbannerblock/_search/', q)
                .map((res:any)=> res.hits.hits.map(o=>o._source));

        }

    }

    getRightHtmlBlocks(mainMenuId:number){
        return this.getHtmlBlocks(mainMenuId, "Html");
    }

    getLeftHtmlBlocks(mainMenuId:number){
        return this.getHtmlBlocks(mainMenuId, "Banner");
    }

    getAllHtmlBlock(){
        return this.http.post(this.searchBase + '/htmlbannerblock/_search/', this.queryalldocs)
            .map((res:any)=> res.hits.hits.map(o=>o._source));
    }

    // Get Logo
    getLogo(): Observable<any>{
        return this.http.get('./assets/json/' + 'logo.json');
    }

    // Get Category
    getCategory(): Observable<Category[]>{
        if(environment.production){
            this.queryalldocs.size = 100;
            return this.http.post(this.searchBase + '/branch/_search', this.queryalldocs)
                .map((res:any)=> res.hits.hits.map(o=>o._source));
        }
        return of(CATEGORIES);
    }

    getBlogPost():Observable<BlogPost[]>{
        if(environment.production){
            return this.http.post(this.searchBase + '/blogpost/_search', this.queryalldocs)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of(BLOGPOSTS);
    }

    getBlogCategory():Observable<BlogCategory[]>{
        if(environment.production){
            return this.http.post(this.searchBase + '/blogcategory/_search', this.queryalldocs)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of([
            {
                "id": 1,
                "name": "Новини"
            },
            {
                "id": 2,
                "name": "Останні новини"
            },
            {
                "id": 3,
                "name": "Цікаво знати"
            }
        ]);
    }

    getMenuCategoryByName(name:string):Observable<MenuCategory>{

        if(environment.production){
            let q={"query":{"match":{"name":name}}, "size":1};
            return this.http.post(this.searchBase + '/menucategory/_search',q)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of(this.MENUCATEGORIES.find(c => c.name === name)[0]);
    }

    getMenuCategories():Observable<MenuCategory[]>{

        if(environment.production){

            return this.http.get(this.searchBase + '/menucategory/_search')
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of(this.MENUCATEGORIES);
    }

    getMainSliders():Observable<any[]>{
        if(environment.production){
            return this.http.post(this.searchBase + '/mainslider/_search', this.queryalldocs)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }

    }


    getMainImgs():Observable<any[]>{
        if(environment.production){
            return this.http.post(this.searchBase + '/product/_search', this.queryalldocs)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }

    }

    getBlogPostByCategory(categoryId):Observable<BlogPost[]>{
        if(environment.production){
            console.log(categoryId);
            return this.http.post(this.searchBase + '/blogpost/_search',
                {'query':{'term':{'blogCategory.id':categoryId}}})
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of(BLOGPOSTS.filter(p=>p.blogCategory.id == categoryId));
    }


    getBlogPostById(id):Observable<any>{
        if(environment.production){
            return this.http.get(this.searchBase + '/blogpost/blogpost/' + id);
        }
        return of(BLOGPOSTS.filter(p=>p.id == id)[0]);
    }
    getBlogPostByTitle(title:string):Observable<any> {
        if (environment.production) {
            let q = {"query": {"match": {"title": title}}, "size": 1};
            return this.http.post(this.searchBase + '/blogpost/_search', q)
                .map((res: any) => res.hits.hits.map(o => o._source));
        }
        return of(BLOGPOSTS.find(c => c.title === title)[0]);
    }

    getMainMenus():Observable<any>{
        if(environment.production){
            return this.http.post(this.searchBase + '/mainmenu/_search/', this.queryalldocs)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of([
            {
                "id": 2,
                "title": "Новини",
                "position": 1
            },
            {
                "id": 3,
                "title": "Акції",
                "position": 2
            }
        ]);
    }
    getStores():Observable<any[]>{
        let q ={
            'size' : 100,
            'query': {
                'match_all': {}
            }
        };
        if(environment.production){
            return this.http.post(this.searchBase + '/store/_search', q)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of(STORES);

    }

    getStoreById(id:number):Observable<any>{
        if(environment.production){
            return this.http.get(this.searchBase + '/store/store/' + id);
        }
        return of(STORES.filter(p=>p.id == id)[0]);
    }

    splitCoords(line: string): any {
        if(line){
            const coords = line.replace(" ","").split(",");
            return { lat: parseFloat(coords[0]), lng: parseFloat(coords[1])}
        }
        else return { lat: parseFloat("50.478418"), lng: parseFloat("30.549007")}
    }

    getStoreByCity(city:string):Observable<Store[]>{
        if(environment.production){
            let q ={
                size:100,
                "query" : {
                    "constant_score" : {
                        "filter" : {
                            "match" : {
                                "city" : city
                            }
                        }
                    }
                }
            };
            return this.http.post(this.searchBase + '/store/_search', q)
                .map((res:any)=>res.hits.hits.map(o=>o._source));
        }
        return of(STORES.filter(p=>p.city == city));
    }

    getOrderList():Observable<any>{

        if(environment.production){
            return this.http.get(this.authBase + '/api/sale-orders?size=999');
        }
        return of([
            {
                "id": 3,
                "buyer": "Іван Федотович",
                "orderDate": "2017-12-09",
                "state": "NEW",
                "cancelled": false,
                "paid": true,
                "deliveryAllowed": true,
                "delivered": false,
                "hasTroubles": false,
                "total": 2000,
                "lines": [
                    {
                        "id": 1,
                        "quantity": 1,
                        "item": {
                            "id": 4684,
                            "model": "Шапка 1",
                            "stock": 0,
                            "size": "58",
                            "growth": ""
                        }
                    }
                ]
            }
        ]);

    }

    // post Order header
    postOrder(order: Order):Observable<any>{
        if(environment.production){
            return this.http.post(this.authBase+ '/api/sale-orders', order);
        }
        return of({
            "id": 1,
            "buyer": "Віктор Андрійович",
            "orderDate": "2017-12-09",
            "state": "PROCESSING",
            "cancelled": false,
            "paid": true,
            "deliveryAllowed": true,
            "delivered": false,
            "hasTroubles": false,
            "total": 1000,
            "phone": null,
            "area": "Київська",
            "city": "Київ",
            "warehouse": "49",
            "lines": []
        });
    }

    updateOrder(order: any):Observable<any>{
        if(environment.production){
            return this.http.put(this.authBase+ '/api/sale-orders', order);
        }
        return of({
            "id": 1,
            "buyer": "Віктор Андрійович",
            "orderDate": "2017-12-09",
            "state": "PROCESSING",
            "cancelled": false,
            "paid": true,
            "deliveryAllowed": true,
            "delivered": false,
            "hasTroubles": false,
            "total": 1000,
            "phone": null,
            "area": "Київська",
            "city": "Київ",
            "warehouse": "49",
            "lines": []
        });
    }

    //post order line
    postOrderLine(order :Order, item: Item, quantity: number, price: number){
        if(environment.production){
            return  this.http.post(this.authBase+ '/api/order-lines', {
                "item"    : {"id": item.id},
                "owner"   : {"id": order.id},
                "quantity": quantity,
                "price"   : price,
                "sum"     : quantity * price
            });
        }
        return of({
            "id": 1,
            "quantity": 1,
            "item": {
                "id": 4684,
                "model": null,
                "stock": null,
                "size": null,
                "growth": null
            },
            "owner": {
                "id": 3,
                "buyer": null,
                "orderDate": null,
                "state": null,
                "cancelled": null,
                "paid": null,
                "deliveryAllowed": null,
                "delivered": null,
                "hasTroubles": null,
                "total": null
            }
        });

    }

    getReturnList():Observable<any>{
        return this.http.get(this.authBase + '/api/return-orders');
    }

    returnOrder(order :any, fullName: string, trackNumber:string, personalInfo:string){
        if(environment.production) {
            //this.http.put('/api/order-lines', order.orderLines ).subscribe(()=>{
            this.http.post(this.authBase + '/api/return-orders', {
                "buyer": fullName,
                "trackNumber": trackNumber,
                "identity" : personalInfo,
                "returnDate": new Date().toISOString().slice(0,10),
                "paid": false,
                "saleOrder": {"id" : order.id },
                "state" : "NEW",
                "total" : order.lines.map(l=>l.quantity*l.price).reduce((a,b)=>a+b)


            }).subscribe((response:any)=>{
                order.lines.map(line=>this.http.post(this.authBase + '/api/return-lines',
                    {"owner":{"id":response.id},
                        "item" : line.item,
                        "quantity" : line.quantity,
                        "price": line.price ,
                        "sum": line.price*line.quantity})
                    .subscribe((data:any)=> {
                        // modify the original order line to prevent repeat return
                        this.http.put(this.authBase + '/api/order-lines', {
                            "id": line.id,
                            "owner":{"id":order.id},
                            "quantity": line.quantity,
                            "quantityToReturn":line.quantity,
                            "item":line.item,
                            "price":line.price,
                            "sum": line.price*line.quantity
                        }).subscribe(()=>{
                            // console.log("line...");
                            console.log(line);
                            // console.log("modified...");
                        });
                    }));
            });
            //});
        }
        return of({
            "id": 1,
            "quantity": 1,
            "price": null,
            "sum": null,
            "quantityToReturn": 1,
            "item": {
                "id": 4684,
                "model": "Шапка 1",
                "stock": 0,
                "size": "58",
                "growth": ""
            },
            "article": "AD 19.01.40"
        });
    }
    // Get Size
    getSizes(filter:any): Observable<any>{
        if(environment.production){
            let query = {
                "size": 0,
                "query": {
                    "constant_score":{
                        "filter": {
                            "bool": {
                                "must": this.getMustfilter(filter)
                            }
                        }
                    }
                },
                "aggs": {
                    "group_by_size": {
                        "terms": {
                            "field": "items.size",
                            "size" : 100
                        }
                    }
                }
            };
            //console.log("DEBUG AGG query: "+ JSON.stringify(query));
            return this.http.post(this.searchBase + '/product/_search', query)
                .map((res:any) => res.aggregations.group_by_size.buckets.sort((a,b)=>a.key>b.key).map(o=> {return {id:0,value: o.key.toUpperCase(), check: false};}));
        }
        return this.http.get(this.searchBase + 'size.json');
    }

    // Get Color
    /*
    getColors(filter:any): Observable<Color[]>{
        console.log("Filter by", filter);
        console.log(filter);

            let query = {
                "size": 0,
                "query": {
                    "constant_score":{
                        "filter": {
                            "bool": {
                                "must": this.getMustfilter(filter)
                            }
                        }
                    }
                },
                "aggs": {
                    "group_by_color": {
                        "terms": {
                            "field": "color",
                            "size" : 50
                        }
                    }
                }
            };
            //console.log("DEBUG AGG query: "+ JSON.stringify(query));
            return this.http.post(this.searchBase + '/product/_search', query)
                .map((res:any) => res.aggregations.group_by_color.buckets.map(o=>{return {id:0,nameColor:o.key}}));
        }
        return this.http.get(this.searchBase + 'color.json');
    }
    */
    getColors(filter:any):Observable<any[]> {
        if (environment.production) {
            return this.getPropertyBuckets(filter, "color")
                .map((res: any) => res.aggregations.group_by_color.buckets.map(o => {
                    return {id: 0, nameColor: o.key}
                }))
        }
    }

    getStyles(filter:any):Observable<any[]>{
        if (environment.production) {
            return this.getPropertyBuckets(filter, "style")
                .map((res: any) => res.aggregations.group_by_color.buckets.map(o => { return {  "value": o.key.toUpperCase(), "check": false};}));
        }
    }

    getPatterns(filter:any):Observable<any[]>{
        if (environment.production) {
            return this.getPropertyBuckets(filter, "pattern")
                .map((res: any) => res.aggregations.group_by_color.buckets.map(o => { return {  "value": o.key, "check": false};}));
        }
    }

    getCollections(filter:any):Observable<any[]>{
        if (environment.production) {
            return this.getPropertyBuckets(filter, "collection")
                .map((res: any) => res.aggregations.group_by_color.buckets.map(o => { return {  "value": o.key, "check": false};}));
        }
    }
    getPropertyBuckets(filter: any, field: string){
        let query = {
            "size": 0,
            "query": {
                "constant_score":{
                    "filter": {
                        "bool": {
                            "must": this.getMustfilter(filter)
                        }
                    }
                }
            },
            "aggs": {
                "group_by_color": {
                    "terms": {
                        "field": field,
                        "size" : 50
                    }
                }
            }
        };
        return this.http.post(this.searchBase + '/product/_search', query);
    }


    onSearch($event){
        console.log("Searching!");
        this.searchClicked.next($event);
    }
    onPageChange($event){
        console.log("Page changed!");
        this.pageChanged.next($event);
    }
    onAddedToCart($event){
        this.addedToCart.next($event);
    }
    onEmptyCart(response){
        this.cartIsEmptied.next(response);
    }

    search(filter: any, page: number) : Observable<Product[]>{

        console.log("searching & sorting by =" + JSON.stringify(filter));

        if(environment.production){
            return this.searchProduction(filter, page);
        }

        return this.searchDev(filter);

    }

    searchDev(filter: any){
        let newProductList = PRODUCTS.filter((item: Product) => this.applyFilter(item, filter));
        this.total = newProductList.length;

        if(filter['sort'].price)
            newProductList = newProductList
                .sort( filter['sort'].price == 'asc'?(a, b) => a.price - b.price:(a, b) => b.price - a.price);
        return of(newProductList);
    }

    applyFilter(product: Product, filter: Product): boolean {
        for (let field in filter) {
            if (filter[field]) {

                if(field == 'category'){

                    return product.branches.filter(i=>i.description.toLowerCase() === filter[field].toLowerCase()).length>0;

                }

                // Filter by String
                if (typeof filter[field] === 'string') {
                    if (product[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                        return  false;
                    }

                }else if(typeof filter[field] === 'boolean'){
                    if (product[field] !== filter[field]) {
                        return false;
                    }

                    // Filter by Number
                }else if(typeof filter[field] === 'number') {

                    // Filter Price
                    if (field == 'price') {
                        if (product[field] >= filter[field]) {
                            return false;
                        }

                        // Filter Number Only
                    }else{
                        if (product[field] !== filter[field]) {
                            return false;
                        }
                    }

                    // Filter by Size
                }else if(typeof filter[field] === 'object' && field!=="sort") {
                    /*
                    if(filter[field].includes(product[field])){
                      return true;
                    }else{
                      return false;
                    }
                    */
                    if(filter[field].filter((n) => product.items.map(m=>m.size.toLowerCase()).includes(n)).length>0){
                        return true;
                    }else{
                        return false;
                    }
                }

            }
        }
        return true;
    }

    getMustfilter(filter: any){

        let mustFilter = [];
        for (let field in filter) {
            switch(field){
                case 'menuCategory' : if(filter[field]) mustFilter.push({
                    "match": {
                        "branches.menuCategory.name": filter[field]
                    }
                });break;
                case 'category' : if(filter[field]) mustFilter.push({
                    "match": {
                        "branches.description": filter[field]
                    }
                });break;
                case 'size' : if(filter[field]) mustFilter.push({
                    "terms": {
                        "items.size": filter[field]
                    }
                });break;
                case 'price': if(filter[field]) mustFilter.push({
                    "range": {
                        "price": {
                            "gt": 0,
                            "lte": filter[field]
                        }
                    }
                });break;
                case 'style':
                    if(filter[field]) mustFilter.push({
                    "terms": {
                        "style": filter[field]
                    }
                });break;
                case 'collection':
                if(filter[field]) mustFilter.push({
                    "terms": {
                        "collection": filter[field]
                    }
                });break;
                case 'pattern':
                if(filter[field]) mustFilter.push({
                    "terms": {
                        "pattern": filter[field]
                    }
                });break;
                case 'color' : if(  filter[field]) mustFilter.push({
                    "match": {
                        "color" : filter[field]
                    }
                });break;
                case 'search' : if(  filter[field]) {
                    let regex = /^([a-z][a-z]).(\d\d).(\d\d).(\d\d)$/g;
                    if (!regex.test(filter[field])) {
                        // console.log("default search");
                        mustFilter.push({
                            "match_phrase_prefix": {
                                "nameUA": filter[field]
                            }
                        });
                    }
                    else {
                        let regex1 = /^([a-z][a-z]).(\d\d).(\d\d).(\d\d)$/g;
                        let arr = regex1.exec(filter[field]);
                        // console.log(filter[field]);
                        // console.log(arr);
                        mustFilter.push({
                            "match_phrase_prefix": {
                                "article": arr[1].toUpperCase() + ' ' + arr[2] + '.' + arr[3] + '.' + arr[4]
                            }
                        });
                    }
                }
                default:
            }//switch
        }//for
        return mustFilter;
    }


    searchProduction(filter: any, page: number) : Observable<Product[]>{

        const query = {
            "query": {
                "constant_score": {
                    "filter": {
                        "bool": {
                            "must": this.getMustfilter(filter)
                        }
                    }
                }
            },
            "sort": filter['sort']
        };

        console.log("DEBUG query: "+ JSON.stringify(query));

        let pageFrom = productService.SIZE * (page-1);
        return this.http.post(this.searchBase + '/product/_search?size='+ productService.SIZE +'&from=' + pageFrom, query).map(
            (res:any) => {
                this.total = res.hits.total;
                return res.hits.hits.map(o=>o._source)});
    }

    emailOrderAccepted(id:number){
        return this.http.get(this.authBase + '/api/sale-orders/email/'+id);
    }

}
