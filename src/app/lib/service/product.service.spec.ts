import {Injectable, Injector} from '@angular/core';
import { productService } from '../service/product.service';
import {TestBed ,inject, async, fakeAsync } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Product } from '../service/data/product';
import {
    HttpClient,
    HttpHandler,
    HttpClientModule
} from "@angular/common/http";
import {Order} from "./data/order";
import {Item} from "./data/item";

describe('Service: product service', () => {

    let service: productService;
    let http : HttpClient;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                productService, HttpClient, HttpHandler
            ]
        });

        service = TestBed.get(productService);
        http = TestBed.get(HttpClient);
    });


    it('should post order', ()=>{

        var order : Order  = {
            "buyer": "Віктор Андрійович",
            "orderDate": "2017-12-09",
            "state": "PROCESSING",
            "cancelled": false,
            "paid": true,
            "deliveryAllowed": true,
            "delivered": false,
            "hasTroubles": false,
            "area": "Київська",
            "city": "Київ",
            "warehouse":"49",
            "total": 1000, "orderLines":[{
                "item": {"id": 4684},
                 "quantity": 2,
                 "price": 500
            }]
        };

       service.postOrder(order).subscribe(
           data=>{
               expect(data).toBeTruthy();
               expect(data.id).toBe(1,'id not found');
               order.orderLines.map(line=>service.postOrderLine(order,line.item, line.quantity, line.price).subscribe((data:any)=> {
                   expect(data.id).toBeTruthy('failed post of order line');
               }));
           }
       );
    });
/*
    it('should post order lines',()=>{

        let orderline = {
            "item": {"id": 4684},
            "owner": {"id": 3},
            "quantity": 1

        }


    });
*/
    it('should fetch categories', ()=>{

        service.getCategory().subscribe(
            data => {
                expect(data).toBeTruthy('category data wasnt returned');
                expect(data.length).toBe(79,'incorrect categories count');
            }
        );

    });


});
