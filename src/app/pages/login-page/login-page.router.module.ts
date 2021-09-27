import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageContainer} from '@pages/login-page/login-page.container';

const routes: Routes = [
	{
		path: '',
		component: LoginPageContainer,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginPageRouterModule {}
