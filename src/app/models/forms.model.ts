import { FormControl } from '@angular/forms';

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  repeatPassword: FormControl<string>;
  email: FormControl<string>;
}
