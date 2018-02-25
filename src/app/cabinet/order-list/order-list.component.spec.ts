import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderListComponent } from './order-list.component';
import {of} from "rxjs/observable/of";
import {Product} from "../../lib/service/data/product";
import {PRODUCTS} from "../../lib/service/products";
import {Observable} from "rxjs/Rx";
import {productService} from "../../lib/service/product.service";
import { Order} from "../../lib/service/data/order";
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "../../login/login.service";
import {Principal} from "../../auth/principal.service";
import {AccountService} from "../../auth/account.service";
import {AuthServerProvider} from "../../auth/auth-jwt.service";
import { RouterModule , Router, Data , Params, ActivatedRoute } from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
@NgModule({
    declarations : [],
    imports : [Principal, RouterModule, RouterTestingModule],
    providers : [productService, HttpClientModule, LoginService, Principal, AccountService, AuthServerProvider,
        LocalStorageService,
        SessionStorageService,
        ActivatedRoute,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        Router]
})
class MockProductService extends productService {

    getOrderList():Observable<any[]>{
        return Observable.of([
                      {
                          "id": 4,
                          "buyer": "Іван Юхимович",
                          "orderDate": "2017-12-22",
                          "state": "ACCEPTED",
                          "cancelled": false,
                          "paid": true,
                          "deliveryAllowed": true,
                          "delivered": false,
                          "hasTroubles": false,
                          "total": 2795,
                          "phone": "1112242",
                          "area": null,
                          "city": null,
                          "warehouse": null,
                          "lines": [
                              {
                                  "id": 2,
                                  "quantity": 1,
                                  "price": 500,
                                  "sum": null,
                                  "quantityToReturn": null,
                                  "item": {
                                      "id": 1168,
                                      "model": "Морізо",
                                      "stock": 0,
                                      "size": "48",
                                      "growth": "4"
                                  },
                                  "article": "GE 07.04.20"
                              }
                          ]
                      },
                      {
                          "id": 5,
                          "buyer": "Іван Юхимович",
                          "orderDate": "2017-12-22",
                          "state": "PROCESSING",
                          "cancelled": false,
                          "paid": true,
                          "deliveryAllowed": true,
                          "delivered": false,
                          "hasTroubles": false,
                          "total": 2795,
                          "phone": "1112242",
                          "area": null,
                          "city": null,
                          "warehouse": null,
                          "lines": [
                              {
                                  "id": 3,
                                  "quantity": 1,
                                  "price": 2795,
                                  "sum": 2795,
                                  "quantityToReturn": null,
                                  "item": {
                                      "id": 1168,
                                      "model": "Морізо",
                                      "stock": 0,
                                      "size": "48",
                                      "growth": "4"
                                  },
                                  "article": "GE 07.04.20"
                              }
                          ]
                      },
                      {
                          "id": 6,
                          "buyer": "Іван Юхимович",
                          "orderDate": "2017-12-22",
                          "state": "NEW",
                          "cancelled": false,
                          "paid": true,
                          "deliveryAllowed": true,
                          "delivered": false,
                          "hasTroubles": false,
                          "total": 2795,
                          "phone": "1112242",
                          "area": null,
                          "city": null,
                          "warehouse": null,
                          "lines": [
                              {
                                  "id": 4,
                                  "quantity": 1,
                                  "price": 2795,
                                  "sum": 2795,
                                  "quantityToReturn": null,
                                  "item": {
                                      "id": 1168,
                                      "model": "Морізо",
                                      "stock": 0,
                                      "size": "48",
                                      "growth": "4"
                                  },
                                  "article": "GE 07.04.20"
                              }
                          ]
                      },]);
    }
}

describe('OrderListComponent', () => {

  let mockRouter = {
        navigate: jasmine.createSpy('order-list')
    };
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let pService : productService;
  let psSpy : jasmine.Spy;

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListComponent ],
      imports : [HttpClientModule, RouterModule, RouterTestingModule.withRoutes([{path: 'order-list', component: OrderListComponent},])],
      providers : [
          { provide : productService, useClass:MockProductService},
          LoginService, Principal, AccountService, AuthServerProvider,
          LocalStorageService,SessionStorageService,
          {
              provide: ActivatedRoute,
              useValue: {
                  data: {
                      subscribe: (fn: (value: Data) => void) => fn({
                          //company: COMPANY,
                      }),
                  },
                  params: {
                      subscribe: (fn: (value: Params) => void) => fn({
                          tab: 0,
                      }),
                  },
                  snapshot: {
                      url: [
                          {
                              path: 'order-list',
                          },
                      ],
                  },
              },
          },
          { provide: LocationStrategy, useClass: HashLocationStrategy }
      ]
    })
    .compileComponents()
        .then(()=>{
            fixture = TestBed.createComponent(OrderListComponent);
            component = fixture.componentInstance;
            pService = fixture.debugElement.injector.get(productService);
            psSpy = spyOn(pService, 'getOrderList').and.callThrough();
            fixture.detectChanges();
        });
  }));

  beforeEach(() => {

  });

  it('should create', async(() => {
        expect(component).toBeTruthy();
  }));

  it('should call getOrders', async(() => {
      expect(psSpy.calls.any()).toBe(true, 'getOrderList has been called');
  }));



});
