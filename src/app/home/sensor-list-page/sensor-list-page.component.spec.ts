import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SensorListPageComponent} from './sensor-list-page.component';

describe('SensorListPageComponent', () => {
  let component: SensorListPageComponent;
  let fixture: ComponentFixture<SensorListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
