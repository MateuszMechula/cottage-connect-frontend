import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/register/register.component";
import {AccountComponent} from "./pages/account/account.component";
import {authGuard} from "./guards/auth.guard";
import {VillageDetailsComponent} from "./pages/village-details/village-details.component";
import {roleGuard} from "./guards/role.guard";
import {VillageAddComponent} from "./pages/village-add/village-add.component";

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
    component: VillageDetailsComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['OWNER'],
    }
  },
  {
    path: 'villages-add',
    component: VillageAddComponent,
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
