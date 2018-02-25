import { Component, OnInit } from '@angular/core';
import {productService} from "../../lib/service/product.service";
import {Principal} from "../../auth/principal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-returnlist',
  templateUrl: './returnlist.component.html',
  styleUrls: ['./returnlist.component.scss']
})
export class ReturnlistComponent implements OnInit {

  public returnList:any[];
  constructor(private productService: productService, private router: Router, private principal: Principal) { }

  ngOnInit() {
    if(!this.principal.isAuthenticated()){
        this.router.navigate(["/Login-Show"]);
        return;
    }
    this.productService.getReturnList().subscribe((data)=>{
      this.returnList = data;
    });
  }

}
