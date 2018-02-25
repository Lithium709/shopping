import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {productService} from "../../lib/service/product.service";
import {Store} from "../../lib/service/data/Store";

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  public storeId :number;
  public cityName:string;
  public store: any;
  public location : any;

  constructor(private activeRoute: ActivatedRoute, private productService: productService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((params)=>{
        this.cityName = params["cityName"];
        this.storeId = params["storeId"];
        this.productService.getStoreById(this.storeId).subscribe((data)=>{
          this.store = data._source;
          this.location = this.productService.splitCoords( this.store.coords);
         });
    });
  }

}
