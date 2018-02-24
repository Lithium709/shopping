import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdslideComponent } from './prodslide.component';

describe('ProdslideComponent', () => {
  let component: ProdslideComponent;
  let fixture: ComponentFixture<ProdslideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdslideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
