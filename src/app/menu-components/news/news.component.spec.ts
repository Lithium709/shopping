import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { NewsComponent } from './news.component';
import {STORES} from "../../lib/service/stores";
import {BLOGPOSTS} from "../../lib/service/BlogPosts";
import {Observable} from "rxjs/Rx";
import {BlogPost} from "../../lib/service/data/BlogPost";
import {productService} from "../../lib/service/product.service";
class productServiceStub{

    getBlogPost():Observable<BlogPost[]>{
        return of(BLOGPOSTS);
    }

    getRightHtmlBlocks(id:number){
        return of([{},{}]);
    }
}
describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let pService : productService;
  let psSpy:jasmine.Spy;
  let psSpy2:jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      providers : [{provide: productService, useClass:productServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    component.id = 1;
    pService = fixture.debugElement.injector.get(productService);
    psSpy = spyOn(pService, 'getBlogPost').and.callThrough();
    psSpy2 = spyOn(pService, 'getRightHtmlBlocks').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBlogPost', () => {
      expect(psSpy.calls.any()).toBe(true, 'getBlogPost has been called');
  });

  it('should call getRightHtmlBlocks', () => {
      expect(psSpy2.calls.any()).toBe(true, 'getRightHtmlBlocks has been called');
  });

});
