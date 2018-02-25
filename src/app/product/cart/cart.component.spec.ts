import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CartComponent} from "./cart.component";
import {async} from "@angular/core/testing";
import {CookieService} from "../../lib/service/cookie.service";
import {MatSnackBarModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {Router, RouterModule, ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {NgModule} from "@angular/core";

@NgModule({
    declarations:[CartComponent],
    imports:[MatSnackBarModule, FormsModule, RouterModule, RouterTestingModule],
    providers:[CookieService]})
class MockCookieService extends CookieService {

    public productOrder = [{
        id: 14,
        //id: 0,
        slug: 'AF-10-62-30',
        quantity: 1,
        stock: 1,
        price: 559,
        image: 'http://arber.od.ua:8081/AF10.62.30/1.jpg',
        productName: 'Джемпер д/р',
        item : {}
    }];
   // public addCookie(){}
}
describe('Cart component',()=>{
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    beforeEach(async(()=>{
        TestBed.configureTestingModule({declarations:[CartComponent],
            imports: [MatSnackBarModule, FormsModule, RouterModule, RouterTestingModule],
            providers: [{provide: CookieService, useClass:MockCookieService},
                { provide: Router, useValue:{}},
                { provide: ActivatedRoute, useValue:{}
                }] }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    /*
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    */
    //it('should allow to post after all field are filled', ()=>{
              //    expect(cookie['productOrder']).toBeTruthy();
    //});


});