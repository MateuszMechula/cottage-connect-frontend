import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginForm, RegisterForm, VillageAddForm, VillageAddressForm} from "../models/forms.model";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private phoneRegExp = /^\d{9}$/;

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
    });
  }

  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup({
      login: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
      repeatPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
      role: new FormControl('', {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(75),
        ],
        nonNullable: true,
      }),
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(this.phoneRegExp)
        ],
        nonNullable: true,
      }),
    });
  }

  initVillageForm(): FormGroup<VillageAddForm> {
    return new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        nonNullable: true,
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(255)],
        nonNullable: true,
      })
    });
  }

  initVillageAddressForm(): FormGroup<VillageAddressForm> {
    return new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        nonNullable: true,
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^\d{2}-\d{3}$/)],
        nonNullable: true,
      }),
      city: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
        nonNullable: true,
      }),
      voivodeship: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      country: new FormControl('Polska', {
        validators: [Validators.required],
        nonNullable: true,
      })
    })
  }


  getErrorMessage(control: FormControl, matchingControl?: FormControl): string {
    if (control.hasError('required')) {
      return 'Field is required';
    }
    if (control.hasError('minlength')) {
      return `Minimum length required: ${control.errors?.['minlength']?.requiredLength}.`;
    }
    if (control.hasError('maxlength')) {
      return `Maximum length allowed: ${control.errors?.['maxlength']?.requiredLength}.`;
    }
    if (control.hasError('email')) {
      return `Invalid email address`;
    }
    if (control.hasError('pattern')) {
      return `Invalid format`;
    }
    if (control.hasError('postalCode')) {
      return `Invalid postal code format. It should be XX-XXX where X is any digit.`;
    }
    if (matchingControl && control.value !== matchingControl.value) {
      return 'Passwords do not match';
    }
    return '';
  }
}
