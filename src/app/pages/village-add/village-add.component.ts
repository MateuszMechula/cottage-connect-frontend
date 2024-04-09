import {Component} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {VillagesService} from "../../services/villages.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormGroup} from "@angular/forms";
import {VillageAdd} from "../../interfaces/village-add";
import {VillageAddForm, VillageAddressForm} from "../../models/forms.model";
import {Router} from "@angular/router";
import {FormService} from "../../services/form.service";

@Component({
  selector: 'app-village-add',
  templateUrl: './village-add.component.html',
  styleUrl: './village-add.component.css'
})
export class VillageAddComponent {
  villageAddForm: FormGroup<VillageAddForm> = this.formService.initVillageForm();
  villageAddressForm: FormGroup<VillageAddressForm> = this.formService.initVillageAddressForm();
  readonly VOIVODESHIPS: string[] = [
    'Dolnośląskie', 'Kujawsko-Pomorskie', 'Lubelskie', 'Lubuskie',
    'Łódzkie', 'Małopolskie', 'Mazowieckie', 'Opolskie',
    'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
    'Świętokrzyskie', 'Warmińsko-Mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
  ];

  constructor(private villagesService: VillagesService,
              private formService: FormService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  addVillage() {
    const addVillageRequest = this.villageAddForm.controls;
    const addressVillageRequest = this.villageAddressForm.controls;
    const villageAddRequest = this.createVillage(addVillageRequest, addressVillageRequest);

    this.villagesService.addVillage(villageAddRequest).subscribe({
      next: () => {
        this.snackBar.open('Village added successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.router.navigate(['/villages'])
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
      },
    });
  }

  private createVillage(addVillageRequest: VillageAddForm, addressVillageRequest: VillageAddressForm) {
    const villageAddRequest: VillageAdd = {
      name: addVillageRequest.name.value,
      description: addVillageRequest.description.value,
      addressDTO: {
        street: addressVillageRequest.street.value,
        postalCode: addressVillageRequest.postalCode.value,
        city: addressVillageRequest.city.value,
        voivodeship: addressVillageRequest.voivodeship.value,
        country: addressVillageRequest.country.value
      }
    }
    return villageAddRequest;
  }
}
