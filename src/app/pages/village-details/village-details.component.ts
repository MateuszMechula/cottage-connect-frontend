import {Component} from '@angular/core';
import {VillagesService} from "../../services/villages.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {VillageDetail} from "../../interfaces/village-detail";

@Component({
  selector: 'app-villages',
  templateUrl: './village-details.component.html',
  styleUrl: './village-details.component.css'
})
export class VillageDetailsComponent {
  village$ = new BehaviorSubject<VillageDetail[]>([]);

  constructor(private villagesService: VillagesService,
              private snackBar: MatSnackBar) {
    this.loadVillages();
  }

  getVillages() {
    return this.villagesService.getAllVillages();
  }

  loadVillages() {
    this.getVillages().subscribe({
      next: villages => {
        this.village$.next(villages);
      }
    })
  }

  deleteVillage(villageId: number) {
    this.villagesService.deleteVillageById(villageId).subscribe({
      next: () => {
        this.snackBar.open('Village deleted successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.loadVillages();
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
