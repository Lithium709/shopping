import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialComponent } from './social.component';
import {SocialService} from "./social.service";
import {FormsModule} from '@angular/forms';
import {By} from "@angular/platform-browser";

class SocialServiceStub{

    getProviderSetting(provider) {
        switch (provider) {
            case 'google': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
            case 'facebook': return 'public_profile,email';
            default: return 'Provider setting not defined';
        }
    }

    getProviderURL(provider) {
         return 'http://localhost:8080'+ '/signin/' + provider;
    }

    getCSRF(){
        return "1111111111111111111111111111111111";
    }

}

describe('SocialComponent(not much to test)', () => {
    let component: SocialComponent;
    let fixture: ComponentFixture<SocialComponent>;
    let socialService: SocialService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SocialComponent],
            imports: [FormsModule],
            providers: [{provide: SocialService, useClass: SocialServiceStub}]
        })
            .compileComponents().then(() => {
            fixture = TestBed.createComponent(SocialComponent);
            component = fixture.componentInstance;
            this.socialService = fixture.debugElement.injector.get(SocialService);
            component.provider = "google";
            component.ngOnInit();
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get provider settings', () => {
        expect(component.provider).toEqual("google");
        expect(component.providerSetting).toEqual('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');
        expect(component.providerURL).toEqual('http://localhost:8080'+ '/signin/google');
        expect(component.csrf).toEqual('1111111111111111111111111111111111');
    });

    it('should have button and form element and no a tag', () => {
        let button = fixture.debugElement.query(By.css("button[type='submit']")).nativeElement;
        expect(button).toBeTruthy();
        let form = fixture.debugElement.query(By.css('form[method=post]'));
        expect(form).toBeTruthy();
        let a = fixture.debugElement.query(By.css('a'));
        expect(a).toBeFalsy();
    });

    it('should reflect data on html', ()=>{

       let values = fixture.debugElement.queryAll(By.css('input[type=hidden]')).map(i=>i.nativeElement.value);
       expect(values).toContain('1111111111111111111111111111111111');
       expect(values).toContain('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email');

    });

});