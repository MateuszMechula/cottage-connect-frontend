import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from './pages/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {HomeComponent} from './pages/home/home.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {RegisterComponent} from './pages/register/register.component';
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {AccountComponent} from './pages/account/account.component';
import {tokenInterceptor} from "./interceptor/token.interceptor";
import {VillageDetailsComponent} from './pages/village-details/village-details.component';
import {MatCardModule} from "@angular/material/card";
import {VillageAddComponent} from "./pages/village-add/village-add.component";
import {VillageUpdateComponent} from './pages/village-update/village-update.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    AccountComponent,
    VillageDetailsComponent,
    VillageAddComponent,
    VillageUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelect,
    MatOption,
    MatCardModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
