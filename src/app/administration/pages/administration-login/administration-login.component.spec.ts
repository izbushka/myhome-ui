import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationLoginComponent } from './administration-login.component';

describe('AdministrationLoginComponent', () => {
  let component: AdministrationLoginComponent;
  let fixture: ComponentFixture<AdministrationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
