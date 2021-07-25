import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page.component';
import {LoginPageRouterModule} from '@pages/login-page/login-page.router.module';
import {LoginPageContainer} from '@pages/login-page/login-page.container';

@NgModule({
	declarations: [LoginPageComponent, LoginPageContainer],
	imports: [CommonModule, LoginPageRouterModule],
	exports: [LoginPageContainer],
})
export class LoginPageModule {}
