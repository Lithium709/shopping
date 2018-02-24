import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepslistComponent } from './stepslist.component';

describe('StepslistComponent', () => {
  let component: StepslistComponent;
  let fixture: ComponentFixture<StepslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
