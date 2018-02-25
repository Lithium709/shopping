import { Component, OnInit } from '@angular/core';
import {productService} from "../../lib/service/product.service";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-returdetale',
  templateUrl: './returdetale.component.html',
  styleUrls: ['./returdetale.component.scss']
})
export class ReturdetaleComponent implements OnInit {

  public returnOrder: any = {};
  public  trackNumber: string;
  public fullName:string;
  public personalInfo:string;
  constructor(private productService: productService, private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {

      this.returnOrder = this.productService.orderToReturn;
      this.returnOrder.lines =   this.productService.orderToReturn.lines.filter(e=>e.toReturn);
     /*
      for(let i=0; i<this.returnOrder.length;i++){
          this.returnOrder[i].quantityToReturn = this.returnOrder[i].quantity;
      }
      */
  }

    saveReturn($event){
      this.productService.returnOrder(this.returnOrder, this.fullName, this.trackNumber, this.personalInfo);
      this.router.navigate(['/returnlist']);
    }

}
