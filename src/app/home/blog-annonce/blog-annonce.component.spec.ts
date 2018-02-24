import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAnnonceComponent } from './blog-annonce.component';

describe('BlogAnnonceComponent', () => {
  let component: BlogAnnonceComponent;
  let fixture: ComponentFixture<BlogAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
