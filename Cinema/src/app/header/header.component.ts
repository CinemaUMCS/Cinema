import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';

import {AuthGuard} from '../auth.guard';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService, ConfigService]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: boolean;
  private href: string;

  constructor(private authService: UserService,
              private router: Router) {
      this.href = this.router.url;
      console.log(this.href);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  onLogout() {
    this.authService.logout();                      // {3}
  }

}
