import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgmCoreModule } from '@agm/core';
import { StoresComponent } from './stores.component';
import {STORES} from "../../lib/service/stores";
import {of} from "rxjs/observable/of";
import {productService} from "../../lib/service/product.service";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
class ProductServiceStub{
    getStoreByCity(cityName:string){
        return of(STORES.filter(s=>s.city==cityName));
    }
}
describe('StoresComponent', () => {
  let component: StoresComponent;
  let fixture: ComponentFixture<StoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresComponent ],
      imports : [AgmCoreModule.forRoot({
          apiKey: 'AIzaSyBUFx_CneKBEtMIP76b7LR-lQRPIhpTt-Y'
      })],
      providers :[{provide: productService, useClass:ProductServiceStub},
        {provide: ActivatedRoute, useValue: {
                params: Observable.of({cityName: 'Київ'})
            }},  ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
