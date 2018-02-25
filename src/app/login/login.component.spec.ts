import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { LoginDialogComponent } from './login.component';
import {MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from "@angular/material";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {Principal} from "../auth/principal.service";
import {LoginService} from "./login.service";
import {StateStorageService} from "../auth/state-storage.service";
import {Router} from "@angular/router";

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDialogComponent ],
      imports: [FormsModule],
      providers: [
              {
                provide: MAT_DIALOG_DATA,
                  useValue: {},
              },
              {
                provide: MatDialogRef,
                useValue :{}
              },
               {provide: Principal,
                useValue: {}
               },
              {  provide: LoginService,
                  useValue: {}
              },
              {
                provide: StateStorageService,
                useValue: {}
              },
              {
                provide: Router,
                useValue:{}
              }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
