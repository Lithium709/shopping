import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { ShopsComponent } from './shops.component';
import {STORES} from "../../lib/service/stores";
import { productService } from '../../lib/service/product.service';

class productServiceStub{
      getStores(){
        return of(STORES);
      }

      getRightHtmlBlocks(id:number){
          return of([{},{}]);
      }
}
describe('ShopsComponent', () => {
  let component: ShopsComponent;
  let fixture: ComponentFixture<ShopsComponent>;
  let pService : productService;
  let psSpy:jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsComponent ],
      providers : [{provide: productService, useClass:productServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsComponent);
    component = fixture.componentInstance;
    component.id = 3;
    pService = fixture.debugElement.injector.get(productService);
    psSpy = spyOn(pService, 'getStores').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


    it('should call getStores', () => {
        expect(psSpy.calls.any()).toBe(true, 'getStores has been called');
    });



});
