import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginForm} from "../../models/forms.model";
import {FormService} from "../../services/form.service";
import {AuthService} from "../../services/auth.service";
import {LoginRequest} from "../../interfaces/login-request";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide: boolean = true;
  loginForm: FormGroup<LoginForm> = this.formService.initLoginForm();


  constructor(
    private formService: FormService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  get controls() {
    return this.loginForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  login() {
    const loginValue = this.loginForm.controls.login.value || '';
    const passwordValue = this.loginForm.controls.password.value || '';

    const loginRequest: LoginRequest = {
      email: loginValue,
      password: passwordValue,
    }
    this.authService.login(loginRequest)
      .subscribe({
        next: (response) => {
          this.snackBar.open('Login successful', 'Close', {
            duration: 3000
          });
        },
        error: (err) => {
          this.snackBar.open('Login failed', 'Close', {
            duration: 3000
          });
        }
      });
  }
}
