import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdgalleryComponent } from './prodgallery.component';

describe('ProdgalleryComponent', () => {
  let component: ProdgalleryComponent;
  let fixture: ComponentFixture<ProdgalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdgalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
