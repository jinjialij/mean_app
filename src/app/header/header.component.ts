import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authServiceSubs: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authServiceSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });


    if (this.authService.getAccounts().length == 0) {
      this.authService.getUserAccounts();
    }
  }

  ngOnDestroy() {
    this.authServiceSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  getUserEmail() {
    return this.authService.getUserEmail();
  }

}
