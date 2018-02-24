import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { ShopCookieService } from '../../lib/service/cookie.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Cookie } from 'ng2-cookies';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Item } from '../../lib/service/data/item';
import { Product } from '../../lib/service/data/product';
import { productService } from '../../lib/service/product.service';
import {CartComponent} from "../cart/cart.component";
import {ProdgalleryComponent} from "../prodgallery/prodgallery.component";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
    private productName: string;
    public selectedItems: Item[];
    public product: Product;
    private cloneProduct: Product[] = [];
    private productImage: string;
    private selectedImage: any;
    // private objectOrder: any;
    public productsOrder = [];
    private productWishlist = [];
    private productCompare = [];
    public productCount: number = 0;
    productState: boolean = false;
    loadingState: boolean = true;
    public sizes : string[]  = [];
    public growths : string[]  = [];
    private selectedSizes : string[]  = [];
    private selectedGrowths : string[]  = [];
    //selectAll : boolean = false;
    activeImageIndex: number = 0;
    zoomedIndex : number = -1;
    constructor(
        public dialog: MatDialog,
        private activeRoute: ActivatedRoute,
        private productService: productService,
        public snackBar: MatSnackBar,
        private cookie: ShopCookieService,
        @Inject(PLATFORM_ID) private platformId: Object
    ){
        this.productsOrder = this.cookie['productsOrder'];
        this.productWishlist = this.cookie['arrWishList'];
        this.productCompare = this.cookie['arrCompare'];
    }

    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            console.log("params =" +  params);
            this.productName = params["detail"];
            this.productService.getSlugProduct(this.productName).subscribe(product => {
                this.product = product;
                console.log(product);
                this.selectedItems = [];
                this.sizes = Array.from(new Set(this.product.items.map(i=>i.size))).sort();
                this.growths = Array.from(new Set(this.product.items.map(i=>i.growth))).sort();
                if(this.product.items.length === 1) {
                    this.selectedItems = [this.product.items[0]];
                    if(this.sizes[0]){
                      // console.log("Size: " + this.sizes[0]);
                       this.selectedSizes = [this.sizes[0]];
                    }
                    if(this.growths[0]){
                        //console.log("Growth: " + this.growths[0]);
                        this.selectedGrowths = [this.growths[0]];
                    }
                }
                this.productState = true;
                this.loadingState = false;
                this.productImage = product.image;


                // Init Demo Image
                this.selectedImage = _.find(product.photos, (o) => {
                    return o.id == product.photos[0].id
                });

                // Init Counter product button
                this.buttonCounter(product.id);
                //this.productCount = this.cookie['productsOrder'].length;
            });
        });
    }


    openDialog() {
        let dialogRef = this.dialog.open(ProdgalleryComponent,{panelClass: 'mat-gal-modal'});
        dialogRef.componentInstance.gallery = this.product.photos;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }

    
    // Button Counter
    buttonCounter(idProduct: number){
        this.product.items.forEach((it)=>{
            var findObj = _.find(this.cookie['productsOrder'], ['id', it.id]);
            if(findObj != undefined){
                this.productCount = findObj.quantity;
            }
        })
    }


    openCart() {
        let dialogRef = this.dialog.open(CartComponent, {panelClass: 'myapp-no-padding-dialog'});
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog closed: ${result}`);
            //this.dialogResult = result;
        });
    }

    onClickCart(){
       // document.getElementById("megamenuCart").style.display = "block";
       this.openCart();
    }

    // Add Cart to Cookie
    addCart(cName) {
        var item = this.selectedItems[0];
        this.productsOrder = this.cookie['productsOrder'] || [];
        let obj = _.find(this.productsOrder, ['id', item.id]);
        // Set Object Order Product
        if(obj==undefined){
            let objectOrder = {
                id: item.id,
                //id: 0,
                slug: this.product.slug,
                quantity: 1,
                stock: 1,
                price: this.product.price,
                image: this.product.photos[0].link,
                productName: this.product.nameUA,
                item : item
            };
            this.productsOrder.push(objectOrder);
        }else{
            obj.quantity = obj.quantity + 1;             
        }   
        // this.buttonCounter(item.id);
        this.cookie.addCookie(cName, JSON.stringify(this.productsOrder));
        this.onClickCart();
        this.productService.onAddedToCart(1);
       /* this.openSnackBar(this.product.nameUA, 'Added to Cart'); */
    }

    // Add wishlist to cookie
    addWishlist(cName, cValue){
        let obj = _.find(this.productWishlist, (x)=>{
            return x == this.product['index'];
        });
        if(obj == undefined){
            this.productWishlist.push(this.product['index']);
        }

        this.cookie.addCookie(cName, JSON.stringify(cValue));
        this.openSnackBar(this.product.nameUA, 'Added to Wishlist');
    }

    // Add Compare
    addCompare(cName, cValue){
        let obj = _.find(this.productCompare, (x)=>{
            return x == this.product['index'];
        });
        if(obj == undefined){
            this.productCompare.push(this.product['index']);
        }

        this.cookie.addCookie(cName, JSON.stringify(cValue));
        this.openSnackBar(this.product.nameUA, 'Added to Compare');
    }
   
   highlightGrowths(size : string){

      let newGrowths : string[]=[];
      this.selectedItems = this.product.items.filter(i=>i.size == size);
      newGrowths = this.selectedItems.map(i=>i.growth);
      if(this.selectedGrowths.length ==1 && newGrowths.indexOf(this.selectedGrowths[0])>-1){
          this.selectedItems = this.selectedItems.filter(i=>i.growth == this.selectedGrowths[0]);
      }
      else{
          this.selectedGrowths = newGrowths;
      }
      this.selectedSizes = [ size ];
      console.log(this.selectedItems);

   }

   highlightSizes(growth : string){

      let newSizes:string[]=[];
      this.selectedItems = this.product.items.filter(i=>i.growth == growth);
      newSizes = this.selectedItems.map(i=>i.size);
      if(this.selectedSizes.length==1 && newSizes.indexOf(this.selectedSizes[0])>-1){
          this.selectedItems = this.selectedItems.filter(i=>i.size == this.selectedSizes[0]);
      }
      else{
          this.selectedSizes = newSizes;
      }
      this.selectedGrowths = [ growth ];
      console.log(this.selectedItems);   
   }

    // Snack Bar
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
    }
    
    // Image Gallery
    selectImage(gallery){
        this.selectedImage = gallery;
        this.productImage = gallery.images;
    }

    swipe(e,i){
        console.log('swipe', e);
        if (isPlatformBrowser(this.platformId)) {
            switch (e) {
                case 'swipeleft':
                    this.activeImageIndex = Math.min(this.product.photos.length - 1, i + 1);
                    break;
                case 'swiperight':
                    this.activeImageIndex = Math.max(i - 1, 0);
                    break;
                case 'swipeup' :
                    window.scrollTo(0, window.pageXOffset + 400);
                    break;
                case 'swipedown' :
                    window.scrollTo(0, window.pageXOffset - 400);
                    break;
            }
        }
    }

    arrows(e,i){
        switch(e){
            case 'prev': this.activeImageIndex = Math.min(this.product.photos.length - 1, i + 1);break;
            case 'next': this.activeImageIndex = Math.max(i - 1, 0);break;
        }
    }



    onTapZoom(i){
       if(this.zoomedIndex == -1){
           this.zoomedIndex = i;
       }
       else{
           this.zoomedIndex = -1;
       }
    }
}
