import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './spinner.component';
import {SpinnerContainer} from './spinner.container';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	declarations: [SpinnerComponent, SpinnerContainer],
	imports: [CommonModule, MatProgressSpinnerModule],
	exports: [SpinnerContainer],
})
export class SpinnerModule {}
