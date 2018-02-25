import { Component, OnInit } from '@angular/core';
import {productService} from "../../lib/service/product.service";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";

import {MatTableModule} from "@angular/material";
import {Order} from "../../lib/service/data/order";
import {Principal} from "../../auth/principal.service";


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public  orders : any[];
  constructor(private productService: productService, private loginService: LoginService, private router: Router, private principal: Principal) { }
  public activeOrder : any;

  ngOnInit() {
      if(!this.principal.isAuthenticated()){
          this.router.navigate(["/Login-Show"]);
          return;
      }
      this.productService.getOrderList().subscribe(data=>{
           this.orders = data.sort((a,b)=>b.id-a.id);
      });
  }

  showDetail(order:Order){
      this.activeOrder = order;
      this.activeOrder.lines.map(l=>{
         this.productService.getProductByItemId(l.item.id ).subscribe((data)=>{
            l.product = data;
            l.toReturn = false;
           });
      });
  }

  closeReturn($event){
    this.productService.orderToReturn = this.activeOrder;
    this.router.navigate(['/returnorder']);
  }

}
