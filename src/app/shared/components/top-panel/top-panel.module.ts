import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopPanelComponent} from './top-panel.component';
import {TopPanelContainer} from './top-panel.container';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [TopPanelComponent, TopPanelContainer],
	imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
	exports: [TopPanelContainer],
})
export class TopPanelModule {}
