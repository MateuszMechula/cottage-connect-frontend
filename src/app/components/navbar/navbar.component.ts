import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(protected auth: AuthService,
              private matSnackBar: MatSnackBar,
              public router: Router) {
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.matSnackBar.open('Logout success', 'Close', {
      duration: 5000,
      horizontalPosition: 'center'
    })
    this.router.navigate(['/login'])
  };
}
