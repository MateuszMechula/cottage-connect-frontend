import {FormControl} from '@angular/forms';

export interface LoginForm {
  login: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  repeatPassword: FormControl<string>;
  role: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phone: FormControl<string>;
}

export interface VillageAddForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

export interface VillageAddressForm {
  street: FormControl<string>;
  postalCode: FormControl<string>;
  city: FormControl<string>;
  voivodeship: FormControl<string>;
  country: FormControl<string>;
}


