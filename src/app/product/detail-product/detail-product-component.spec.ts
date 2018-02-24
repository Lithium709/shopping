import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement, Predicate, Component  }    from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { productFilterPipe } from './../../lib//pipe/filter-product';
import { RatingComponent } from './../../lib/component/rating/rating.component';
import { MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatChipsModule, MatSnackBar, MatSnackBarModule  } from '@angular/material';
import { DetailProductComponent } from './detail-product.component';
import { RouterModule , Router, ActivatedRoute } from '@angular/router';
import { productService } from '../../lib/service/product.service';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../lib/service/data/product';
import { HttpClientModule , HttpClient } from "@angular/common/http";
import {PRODUCTS} from '../../lib/service/products';
import { of } from 'rxjs/observable/of';
import { ShopCookieService } from '../../lib/service/cookie.service';
@NgModule({
    declarations: [DetailProductComponent, RatingComponent,productFilterPipe ],
    imports: [MatProgressSpinnerModule,
        NgxPaginationModule,
        MatIconModule,
        MatButtonModule,
        MatChipsModule,
        MatSnackBarModule,
        RouterModule,
        HttpClientModule,
    ],
    providers: [productService, HttpClientModule, MatSnackBar, ActivatedRoute, ShopCookieService]
})

class MockProductService extends productService {

    getProduct(): Observable<Product[]>{
        return of(PRODUCTS);
    }

    getSlugProduct(slug: string): Observable<Product>{
        return this.getProduct().map(products => products.find(product => product.slug === slug));
    }

}

class MockCookieService extends ShopCookieService {

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
}

describe('Product-Detail-Component', () => {

    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    }
    let comp:    DetailProductComponent;
    let fixture: ComponentFixture<DetailProductComponent>;
    let de:      DebugElement;
    let dList: DebugElement[];
    let itemProductTitle:      HTMLElement;
    let el:      HTMLElement;
    let cookie , c: ShopCookieService;
    var psSpy : jasmine.Spy;
    let pService : productService;
    beforeEach(async(() => {
        TestBed.configureTestingModule(
            {
                declarations: [ DetailProductComponent , productFilterPipe, RatingComponent], // declare the test component
                imports: [MatProgressSpinnerModule, NgxPaginationModule, MatIconModule, MatSnackBarModule,
                    MatButtonModule, MatChipsModule, RouterModule, HttpClientModule],
                providers: [{ provide : productService, useClass:MockProductService},
                    {provide: ActivatedRoute, useValue: {
                        params: Observable.of({detail: 'AF-10-62-30'})
                    }},
                    MatSnackBar,
                    { provide : ShopCookieService, useClass:MockCookieService}

                ]
            }
        ).compileComponents().then(()=>{

            fixture = TestBed.createComponent(DetailProductComponent);
            comp = fixture.componentInstance;
            pService = fixture.debugElement.injector.get(productService);
            psSpy = spyOn(pService, 'getSlugProduct').and.callThrough();
            cookie = fixture.debugElement.injector.get(ShopCookieService);
            let productsOrder = cookie['productsOrder'];
            productsOrder.quantity = 0;
            //cookie.removeCookie('products');
            //c = fixture.debugElement.injector.get(cookie);
            //c.removeCookie('products');

        });

    }));

    it('should extact cart  info from cookies', async(()=>{

        expect(cookie['productsOrder']).toBeTruthy();


    }));

    it('should create the Product Component and show output basic data', async(() => {
        expect(comp).toBeTruthy();
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('h3'));
            el = de.nativeElement;
            expect(el.textContent).toBe('Джемпер д/р',"Product title is not shown");

            de = fixture.debugElement.query(By.css('p.value1'));
            el = de.nativeElement;
            expect(el.textContent).toBe('799 грн', "Product oldprice is not shown");

            de = fixture.debugElement.query(By.css('p.value2'));
            el = de.nativeElement;
            expect(el.textContent).toBe('559 грн', "Product price is not shown");

            de = fixture.debugElement.query(By.css('div.active > img'));
            el = de.nativeElement;
            expect(el.getAttribute("src")).toBe('http://arber.od.ua:8081/AF10.62.30/1.jpg', "Product image is not shown");

            el = fixture.debugElement.query(By.css('button')).nativeElement;
            expect(el.textContent).toContain("Додати в кошик".toUpperCase());
            expect(comp.product.items.length).toBe(7);
        });
    }));


    it('should call Product service only once', async(() => {
        expect(psSpy.calls.any()).toBe(false, 'getSlugProduct not yet called');
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();
            expect(psSpy.calls.any()).toBe(true, 'getSlugProduct already called');

        });
    }));


    it('should add 1 item in the cart', async(() => {
        spyOn(comp, 'highlightGrowths').and.callThrough();
        spyOn(comp, 'addCart').and.callThrough();
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();
            let addCartButton = fixture.debugElement.query(By.css('button')).nativeElement;
            expect(addCartButton.textContent).toContain("Додати в кошик".toUpperCase());
            expect(comp.selectedItems.length).toBe(0);
            dList = fixture.debugElement.queryAll(By.css('a.link-prop'));
            dList[2].nativeElement.click();

            fixture.whenStable().then(()=>{

                fixture.detectChanges();
                expect(comp.highlightGrowths).toHaveBeenCalled();
                expect(comp.selectedItems.length).toBe(1);
                addCartButton.click();

                fixture.whenStable().then(()=>{
                    fixture.detectChanges();
                    expect(comp.addCart).toHaveBeenCalled();
                    //expect(addCartButton.textContent).toContain("Add to cart");
                    expect(addCartButton.textContent).toContain("Додати в кошик".toUpperCase());
                });
                //expect(comp.selectedItems.length).toBe(1);
                //expect(addCartButton.textContent).toContain("Add to cart(1)");
            });
        });
    }));

});

describe('Product-Detail-Component few options', () => {

    let mockRouter = {
        navigate: jasmine.createSpy('navigate')
    }
    let comp:    DetailProductComponent;
    let fixture: ComponentFixture<DetailProductComponent>;
    let de:      DebugElement;
    let dList: DebugElement[];
    let itemProductTitle:      HTMLElement;
    let el:      HTMLElement;
    let cookie , c: ShopCookieService;
    let psSpy : jasmine.Spy;
    let addCartSpy: jasmine.Spy;
    let pService : productService;
    beforeEach(async(() => {
        TestBed.configureTestingModule(
            {
                declarations: [ DetailProductComponent , productFilterPipe, RatingComponent], // declare the test component
                imports: [MatProgressSpinnerModule, NgxPaginationModule, MatIconModule, MatSnackBarModule,
                    MatButtonModule, MatChipsModule, RouterModule, HttpClientModule],
                providers: [{ provide : productService, useClass:MockProductService},
                    {provide: ActivatedRoute, useValue: {
                            params: Observable.of({detail: 'AF-15-12-30'})
                        }},
                    MatSnackBar,
                    { provide : ShopCookieService, useClass:MockCookieService}

                ]
            }
        ).compileComponents().then(()=>{

            fixture = TestBed.createComponent(DetailProductComponent);
            comp = fixture.componentInstance;
            pService = fixture.debugElement.injector.get(productService);
            psSpy = spyOn(pService, 'getSlugProduct').and.callThrough();
            addCartSpy = spyOn(comp, 'addCart').and.callThrough();
            cookie = fixture.debugElement.injector.get(ShopCookieService);
            let productsOrder = cookie['productsOrder'];
            productsOrder.quantity = 0;
            //cookie.removeCookie('products');
            //c = fixture.debugElement.injector.get(cookie);
            //c.removeCookie('products');

        });

    }));

    it('should create the Product Component and show output basic data', async(() => {
        expect(comp).toBeTruthy();
        fixture.detectChanges();

        fixture.whenStable().then(() => { // wait for async
            fixture.detectChanges();
            de = fixture.debugElement.query(By.css('h3'));
            el = de.nativeElement;
            expect(el.textContent).toBe('Шарф чоловiчий',"Product title is not shown");

            de = fixture.debugElement.query(By.css('p.value1'));
            el = de.nativeElement;
            expect(el.textContent).toBe('399 грн', "Product oldprice is not shown");

            de = fixture.debugElement.query(By.css('p.value2'));
            el = de.nativeElement;
            expect(el.textContent).toBe('279 грн', "Product price is not shown");

            de = fixture.debugElement.query(By.css('div.active > img'));
            el = de.nativeElement;
            expect(el.getAttribute("src")).toBe('http://arber.od.ua:8081/AF15.12.30/1.jpg', "Product image is not shown");

            el = fixture.debugElement.query(By.css('button')).nativeElement;
            expect(el.textContent).toContain("Додати в кошик".toUpperCase());
            expect(comp.product.items.length).toBe(1);
        });
    }));


    it('should call Product service only once', async(() => {
        expect(psSpy.calls.any()).toBe(false, 'getSlugProduct not yet called');
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();
            expect(psSpy.calls.any()).toBe(true, 'getSlugProduct already called');

        });
    }));

    it('should adding to cart be available immidiately', async(() => {
        fixture.detectChanges();
        let addCartButton = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(addCartButton.textContent).toContain("Додати в кошик".toUpperCase());
        expect(comp.selectedItems.length).toBe(1);
        addCartButton.click();
        fixture.whenStable().then(()=>{
           fixture.detectChanges();
           expect(addCartSpy.calls.any()).toBe(true, 'addCart already called');
         });

    }));

});