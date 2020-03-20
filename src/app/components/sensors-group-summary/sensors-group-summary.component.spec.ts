import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsGroupSummaryComponent } from './sensors-group-summary.component';

describe('SensorsGroupSummaryComponent', () => {
  let component: SensorsGroupSummaryComponent;
  let fixture: ComponentFixture<SensorsGroupSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsGroupSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsGroupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
