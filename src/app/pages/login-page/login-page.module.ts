import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page.component';
import {LoginPageRouterModule} from '@pages/login-page/login-page.router.module';
import {LoginPageContainer} from '@pages/login-page/login-page.container';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [LoginPageComponent, LoginPageContainer],
	imports: [
		CommonModule,
		LoginPageRouterModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatButtonModule,
	],
	exports: [LoginPageContainer],
})
export class LoginPageModule {}
