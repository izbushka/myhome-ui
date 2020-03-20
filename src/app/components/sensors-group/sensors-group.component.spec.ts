import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsGroupComponent } from './sensors-group.component';

describe('SensorsGroupComponent', () => {
  let component: SensorsGroupComponent;
  let fixture: ComponentFixture<SensorsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
