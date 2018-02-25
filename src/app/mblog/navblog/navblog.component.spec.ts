import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavblogComponent } from './navblog.component';

describe('NavblogComponent', () => {
  let component: NavblogComponent;
  let fixture: ComponentFixture<NavblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
