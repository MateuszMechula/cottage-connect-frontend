import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {RegisterForm} from "../../models/forms.model";
import {FormService} from "../../services/form.service";
import {AuthService} from "../../services/auth.service";
import {RegisterRequest} from "../../interfaces/register-request";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterForm> = this.formService.initRegisterForm();
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;

  constructor(private formService: FormService,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  get controls() {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  getErrorMessagePassword(password: FormControl, repeatPassword: FormControl) {
    return this.formService.getErrorMessage(password, repeatPassword);
  }

  register() {
    const formValue = this.registerForm.controls;

    const registerRequest: RegisterRequest = {
      email: formValue.login.value,
      password: formValue.password.value,
      role: formValue.role.value,
      firstname: formValue.firstName.value,
      lastname: formValue.lastName.value,
      phone: formValue.phone.value,
    }

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.snackBar.open('Registered successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        })
        this.router.navigate(['/login'])
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status == 400) {

          this.snackBar.open(err.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center'
          });
        }
      }
    });
  }
}
