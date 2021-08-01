import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {AcControlComponent} from '@shared/components/ac-control/ac-control.component';
import {AcControlContainer} from '@shared/components/ac-control/ac-control.container';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [AcControlComponent, AcControlContainer],
	imports: [
		CommonModule,
		MatCardModule,
		MatIconModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatSlideToggleModule,
		MatFormFieldModule,
		MatSliderModule,
		MatRadioModule,
		MatSelectModule,
		MatOptionModule,
		MatButtonModule,
	],
	exports: [AcControlContainer],
})
export class AcControlModule {}
