import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeotextComponent } from './seotext.component';

describe('SeotextComponent', () => {
  let component: SeotextComponent;
  let fixture: ComponentFixture<SeotextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeotextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeotextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
