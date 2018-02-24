import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {productService} from "../../lib/service/product.service";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  @Input() id:number;
  public leftHtmlBlocks: any[];
  public rightHtmlBlocks: any[];

  constructor(private productService: productService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
      this.productService.getRightHtmlBlocks(this.id).subscribe((data=>{
          this.leftHtmlBlocks = data;
      }));

      this.productService.getLeftHtmlBlocks(this.id).subscribe((data=>{
          this.rightHtmlBlocks = data;
      }));

  }

    onClick($event) {
        if (isPlatformBrowser(this.platformId)) {
            document.getElementById("megamenuServices").style.display = "none";
            var el = document.getElementById("topmainmenu");
            el.classList.remove("wsoffcanvasopener");
        }
    }

}
