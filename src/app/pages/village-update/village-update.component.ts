import {Component, Inject, OnInit} from '@angular/core';
import {VillagesService} from "../../services/villages.service";
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VillageDetail} from "../../interfaces/village-detail";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-village-update',
  templateUrl: './village-update.component.html',
  styleUrl: './village-update.component.css'
})
export class VillageUpdateComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public village: VillageDetail,
              protected villageService: VillagesService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<VillageUpdateComponent>) {
  }

  ngOnInit(): void {
    this.villageService.villageAddForm.patchValue({
      name: this.village.name,
      description: this.village.description
    });

    this.villageService.villageAddressForm.patchValue({
      street: this.village.addressDTO.street,
      postalCode: this.village.addressDTO.postalCode,
      city: this.village.addressDTO.city,
      voivodeship: this.village.addressDTO.voivodeship,
      country: this.village.addressDTO.country
    });
  }

  get villageAddForm() {
    return this.villageService.villageAddForm;
  }

  get villageAddressForm() {
    return this.villageService.villageAddressForm;
  }

  get voivodeships() {
    return this.villageService.VOIVODESHIPS;
  }

  getErrorMessage(control: FormControl) {
    return this.villageService.getErrorMessage(control);
  }

  updateVillage() {
    let villageId = this.village.villageId;
    this.villageService.updateVillage(villageId).subscribe({
      next: () => {
        this.villageService.resetForms();
        this.snackBar.open('Village updated successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.villageService.resetForms();
        this.dialogRef.close('success');
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
