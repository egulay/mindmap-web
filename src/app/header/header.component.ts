import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  currentUser: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isLoggedIn$.subscribe(s => {
      if (s) {
        this.obtainActiveUser();
      }
    });
  }

  obtainActiveUser() {
    this.authService.obtainActiveUser().subscribe(s => this.currentUser = s.fullName);
  }

  onLogout() {
    this.authService.logout();
  }
}
