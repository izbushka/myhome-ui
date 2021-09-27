import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeftMenuComponent} from './left-menu.component';
import {LeftMenuContainer} from './left-menu.container';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
	declarations: [LeftMenuComponent, LeftMenuContainer],
	imports: [CommonModule, MatListModule, RouterModule, MatIconModule],
	exports: [LeftMenuContainer],
})
export class LeftMenuModule {}
