import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDetail} from "../../interfaces/user-detail";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AccountUpdateComponent} from "../account-update/account-update.component";
import {PhotoService} from "../../services/photo.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  userDetails$: Observable<UserDetail> | undefined;
  userPhotoUrl: SafeUrl | null = null;

  constructor(private authService: AuthService,
              private photoService: PhotoService,
              private domSanitizer: DomSanitizer,
              private dialog: MatDialog) {
  }

  loadUserPhoto(userId: number) {
    this.photoService.getUserPhoto(userId).subscribe({
      next: (photoUrl) => {
        this.userPhotoUrl = this.domSanitizer.bypassSecurityTrustUrl(photoUrl);
      },
      error: (err) => {
        console.error('Error loading user photo', err);
      }
    });
  }

  openDialog(user: Observable<UserDetail> | undefined) {
    const dialogRef = this.dialog.open(AccountUpdateComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
      }
    });
  }

  ngOnInit() {
    this.userDetails$ = this.authService.getDetail();
    this.userDetails$.subscribe(userDetails => {
      if (userDetails) {
        const userId = userDetails.userId;
        this.loadUserPhoto(userId);
      }
    })
  }
}
