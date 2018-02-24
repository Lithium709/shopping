import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import { Store } from "../../lib/service/data/Store";
import {productService} from "../../lib/service/product.service";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  constructor(private productService: productService, @Inject(PLATFORM_ID) private platformId: Object) { }

    menuOpen = false;
  public stores: any[];
  public cities: string[];
  public htmlBlocks:any[];
  @Input() id:number;
  ngOnInit() {
      this.productService.getStores().subscribe((data)=>{
        this.stores = data;
        this.cities = Array.from(new Set(data.map(i=>i.city)));
      });

      this.productService.getRightHtmlBlocks(this.id).subscribe(data=>{
          console.log(data);
          this.htmlBlocks = data;
      });
  }

    onClick($event) {
        if (isPlatformBrowser(this.platformId)) {
            document.getElementById("megamenuShops").style.display = "none";
            var el = document.getElementById("topmainmenu");
            el.classList.remove("wsoffcanvasopener");
        }
    }

}
