import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { CatalogComponent } from './catalog.component';
import {BLOGPOSTS} from "../../lib/service/BlogPosts";
import {Observable} from "rxjs/Rx";
import {BlogPost} from "../../lib/service/data/BlogPost";
import {CATEGORIES} from "../../lib/service/categories";
import {Category} from "../../lib/service/data/category";
import {MenuCategory} from "../../lib/service/data/MenuCategory";
import {productService} from "../../lib/service/product.service";
const MENUCATEGORIES = [
    {
        "id": 2,
        "name": "Костюми",
        "position": 1
    },
    {
        "id": 3,
        "name": "Акції",
        "position": 2
    }
];
class productServiceStub{

    getCategory(): Observable<Category[]>{
        return of(CATEGORIES);
    }

    getMenuCategories():Observable<MenuCategory[]>{

          return of(MENUCATEGORIES);
    }

    getRightHtmlBlocks(id:number){
        return of([{},{}]);
    }
}
describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogComponent ],
      providers : [{provide: productService, useClass:productServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
