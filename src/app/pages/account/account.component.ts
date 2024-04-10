import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserDetail} from "../../interfaces/user-detail";
import {Observable} from "rxjs";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  userDetails$: Observable<UserDetail> | undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userDetails$ = this.authService.getDetail();
  }
}
