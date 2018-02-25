import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import {BLOGPOSTS} from "../lib/service/BlogPosts";
import {of} from "rxjs/observable/of";
import {BlogPost} from "../lib/service/data/BlogPost";
import {Observable} from "rxjs/Rx";
import {productService} from "../lib/service/product.service";
import {ActivatedRoute} from "@angular/router";

class ProductServiceStub{

    getBlogPost():Observable<BlogPost[]>{
        return of(BLOGPOSTS);
    }

    getBlogPostById(id:number):Observable<BlogPost>{
      return of(BLOGPOSTS.filter(b=>b.id == id)[0]);
    }
}

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let pService : productService;
  let psSpy : jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      providers :[{provide: productService, useClass:ProductServiceStub},
      {provide: ActivatedRoute, useValue: {
          params: Observable.of({id: '4'})
      }},  ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    pService = fixture.debugElement.injector.get(productService);
    psSpy = spyOn(pService, 'getBlogPostById').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call', () => {
    expect(psSpy.calls.any()).toBe(true, 'getBlogPostById has been called');
  });

});
