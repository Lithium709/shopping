import { Component, OnInit } from '@angular/core';
import {productService} from "../../lib/service/product.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  public htmlBlocks: any[];
  constructor(private productService: productService) { }

  ngOnInit() {

      this.productService.getAllHtmlBlock().subscribe((data=>{
          this.htmlBlocks = data.filter(h=>h.showOnMainPage);
      }));

  }

}
