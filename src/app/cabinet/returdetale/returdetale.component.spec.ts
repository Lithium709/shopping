import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturdetaleComponent } from './returdetale.component';

describe('ReturdetaleComponent', () => {
  let component: ReturdetaleComponent;
  let fixture: ComponentFixture<ReturdetaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturdetaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturdetaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
