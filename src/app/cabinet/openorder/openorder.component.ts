
import { Component, OnInit } from '@angular/core';
import {productService} from "../../lib/service/product.service";
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-openorder',
  templateUrl: './openorder.component.html',
  styleUrls: ['./openorder.component.scss']
})
export class OpenorderComponent implements OnInit {

  constructor(private productService: productService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

}
