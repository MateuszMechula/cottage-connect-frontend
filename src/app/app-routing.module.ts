import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AccountComponent} from "./pages/account/account.component";
import {authGuard} from "./guards/auth.guard";
import {VillagesComponent} from "./pages/villages/villages.component";
import {roleGuard} from "./guards/role.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'villages',
    component: VillagesComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['OWNER'],
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
