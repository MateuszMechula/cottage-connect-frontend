import {Component, OnInit} from '@angular/core';
import {VillagesService} from "../../services/villages.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {VillageDetail} from "../../interfaces/village-detail";
import {MatDialog} from "@angular/material/dialog";
import {VillageUpdateComponent} from "../village-update/village-update.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-villages',
  templateUrl: './village-details.component.html',
  styleUrl: './village-details.component.css'
})
export class VillageDetailsComponent implements OnInit {
  village$ = new BehaviorSubject<VillageDetail[]>([]);

  constructor(private villagesService: VillagesService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.loadVillages();
  }

  openDialog(village: VillageDetail) {
    const dialogRef = this.dialog.open(VillageUpdateComponent, {
      data: village,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.loadVillages();
        this.router.navigateByUrl('/villages');
      }
    });
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
