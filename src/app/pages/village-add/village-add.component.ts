import {Component} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {VillagesService} from "../../services/villages.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-village-add',
  templateUrl: './village-add.component.html',
  styleUrl: './village-add.component.css'
})
export class VillageAddComponent {

  constructor(private villagesService: VillagesService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  get villageAddForm() {
    return this.villagesService.villageAddForm;
  }

  get villageAddressForm() {
    return this.villagesService.villageAddressForm;
  }

  get voivodeships() {
    return this.villagesService.VOIVODESHIPS;
  }

  getErrorMessage(control: FormControl) {
    return this.villagesService.getErrorMessage(control);
  }


  addVillage() {
    this.villagesService.addVillage().subscribe({
      next: () => {
        this.villagesService.resetForms();
        this.snackBar.open('Village added successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.villagesService.resetForms();
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
}
