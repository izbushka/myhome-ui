import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorStatusComponent} from './sensor-status.component';
import {SensorStatusContainer} from './sensor-status.container';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {AcControlModule} from '@shared/components/ac-control/ac-control.module';

@NgModule({
	declarations: [SensorStatusComponent, SensorStatusContainer],
	imports: [CommonModule, MatIconModule, MatSlideToggleModule, AcControlModule],
	exports: [SensorStatusContainer],
})
export class SensorStatusModule {}
