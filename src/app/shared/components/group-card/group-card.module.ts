import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupCardComponent} from '@shared/components/group-card/group-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {GroupCardContainer} from '@shared/components/group-card/group-card.container';

@NgModule({
	declarations: [GroupCardComponent, GroupCardContainer],
	imports: [CommonModule, MatCardModule, MatIconModule],
	exports: [GroupCardContainer],
})
export class GroupCardModule {}
