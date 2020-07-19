import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdministrationSensorsComponent} from './administration-sensors.component';

describe('AdministrationSensorsComponent', () => {
  let component: AdministrationSensorsComponent;
  let fixture: ComponentFixture<AdministrationSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
