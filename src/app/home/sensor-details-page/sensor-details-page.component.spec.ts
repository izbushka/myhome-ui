import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SensorDetailsPageComponent} from './sensor-details-page.component';

describe('SensorDetailsPageComponent', () => {
  let component: SensorDetailsPageComponent;
  let fixture: ComponentFixture<SensorDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
