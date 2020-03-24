import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcControlComponent } from './ac-control.component';

describe('AcControlComponent', () => {
  let component: AcControlComponent;
  let fixture: ComponentFixture<AcControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
