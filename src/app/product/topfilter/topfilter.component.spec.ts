import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatOptionModule, MatSelectModule, MatFormFieldModule, MatDialogModule, MatCheckboxModule, MatMenuTrigger
} from "@angular/material";
import { TopfilterComponent } from './topfilter.component';
import {productService} from "../../lib/service/product.service";
import {ActivatedRoute, Data, Params, Router} from "@angular/router";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [TopfilterComponent],
    imports: [MatOptionModule,MatMenuTrigger, MatSelectModule, MatFormFieldModule, MatDialogModule, MatCheckboxModule,BrowserAnimationsModule],
    providers: [productService, Router, HttpClientModule, ActivatedRoute]
})

class MockProductService extends productService {

}
describe('TopfilterComponent', () => {

  let component: TopfilterComponent;
  let fixture: ComponentFixture<TopfilterComponent>;
  let spy : jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopfilterComponent ],
      imports: [MatOptionModule, MatSelectModule, MatFormFieldModule, HttpClientModule, MatDialogModule, BrowserAnimationsModule, MatCheckboxModule],
        providers: [{provide: productService, useClass: MockProductService},
            {provide: Router, useValue:{}},
            {
                provide: ActivatedRoute,
                useValue: {

                    data: {
                        subscribe: (fn: (value: Data) => void) => fn({
                            _value: undefined,
                        }),
                    },
                    params: {
                        subscribe: (fn: (value: Params) => void) => fn({
                            tab: 0,
                        }),
                    },
                    queryParams: {
                        subscribe: (fn: (value: Params) => void) => fn({
                            category: {id:4},
                        }),
                    }
                },
            }
            ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopfilterComponent);
    component = fixture.componentInstance;
    spy = spyOn(component, 'fetchSize').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
