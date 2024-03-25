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
import {provideHttpClient} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {RegisterComponent} from './pages/register/register.component';
import {MatOption, MatSelect} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelect,
    MatOption
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
