import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorCardComponent } from './sensor.component';

describe('SensorCardComponent', () => {
  let component: SensorCardComponent;
  let fixture: ComponentFixture<SensorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
