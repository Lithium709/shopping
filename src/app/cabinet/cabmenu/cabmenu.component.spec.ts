import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabmenuComponent } from './cabmenu.component';

describe('CabmenuComponent', () => {
  let component: CabmenuComponent;
  let fixture: ComponentFixture<CabmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
