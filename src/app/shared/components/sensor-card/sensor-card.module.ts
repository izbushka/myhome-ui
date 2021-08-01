import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SensorCardComponent} from './sensor-card.component';
import {SensorCardContainer} from './sensor-card.container';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {TimeAgo} from '@shared/pipes/time-ago.pipe';
import {SensorStatusModule} from '@shared/components/sensor-status/sensor-status.module';

@NgModule({
	declarations: [SensorCardComponent, SensorCardContainer, TimeAgo],
	imports: [CommonModule, MatCardModule, MatIconModule, MatSlideToggleModule, SensorStatusModule],
	exports: [SensorCardContainer, TimeAgo],
})
export class SensorCardModule {}
