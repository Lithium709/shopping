import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Principal} from "../auth/principal.service";
import {AccountService} from "../auth/account.service";
import {AuthServerProvider} from "../auth/auth-jwt.service";
import { RouterModule , Router, Data , Params, ActivatedRoute } from '@angular/router';

import { CookieSaverComponent } from './cookie-saver.component';
import {HttpClientModule} from "@angular/common/http";
import {LocalStorageService, SessionStorageService} from "ng2-webstorage";

describe('CookieSaverComponent', () => {
    let component: CookieSaverComponent;
    let fixture: ComponentFixture<CookieSaverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientModule],
            declarations: [ CookieSaverComponent ],
            providers : [{provide: ActivatedRoute, useValue: {params: {
                        subscribe: (fn: (value: Params) => void) => fn({
                            token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhcm1pYXhAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTUxNTAzMTc2MH0.ykVPjioXnR1mhOACmebNq82Ma8WNvjDLZfk39zBe8_DAq3iq0miE7afE3Hxyx5wZrd8RL1M5W04ok5zkmI9lAw",
                        })}}},
                AuthServerProvider,
                LocalStorageService,
                SessionStorageService,
                Principal,
                AccountService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CookieSaverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
