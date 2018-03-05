import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { productService } from "../../lib/service/product.service";
import { Category} from "../../lib/service/data/category";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

    menuOpen = false;
    public categories: Category[];
    public root : Category;
    public menuCategories:any[];
    public menuCategoriesAttention:any[];
    public htmlBlocks:any[];
    @Input() id:number;
  constructor(private productService: productService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
      this.fetchMenuCategory();
      this.productService.getCategory().subscribe((data)=>{
          this.categories = data;
      });
      this.productService.getRightHtmlBlocks(this.id).subscribe((data=>{
           this.htmlBlocks = data;
      }));
  }

    onClick($event) {
        if (isPlatformBrowser(this.platformId)) {
            document.getElementById("megamenu").style.display = "none";

            var el = document.getElementById("topmainmenu");
            el.classList.remove("wsoffcanvasopener");
        }
    }
/*
    categoryClick(subCategory){

        console.log('clicked category!');

        this.router.navigateByUrl("/catalog?category="+subCategory.description);

    }
*/
    getCategoriesByParent(parent: Category) : Category[]{
        return this.categories.filter(o => o.parent != null && o.parent.id === parent.id);
    }
    // Fetching Category

    fetchMenuCategory(){

        this.productService.getMenuCategories().subscribe(data=>{
            let list = data.sort((a,b)=> a.position - b.position);
            this.menuCategoriesAttention = list.filter(i=>i.attention);
            this.menuCategories = list.filter(m => !m.attention);
        });
    }

}
