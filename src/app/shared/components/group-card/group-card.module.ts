import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupCardComponent} from '@shared/components/group-card/group-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	declarations: [GroupCardComponent],
	imports: [CommonModule, MatCardModule, MatIconModule],
	exports: [GroupCardComponent],
})
export class GroupCardModule {}
