import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorStateDirective} from '@shared/directives/sensor-state.directive';

@NgModule({
	declarations: [SensorStateDirective],
	imports: [CommonModule],
	exports: [SensorStateDirective],
})
export class SharedModule {}
