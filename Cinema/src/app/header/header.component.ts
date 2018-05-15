import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';

import {AuthGuard} from '../auth.guard';
import {ConfigService} from '../config.service';
import {AuthenticationService} from '../shared/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {HeaderOpacityService} from '../shared/header-opacity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService, ConfigService]
})
export class HeaderComponent implements OnInit {
  divToChange = document.getElementById('customNav');
  isLoggedIn$: boolean;
  private href: string;
  private isLogged: boolean;
  private loggedSubscription: Subscription;

  backgroundNavbarColor = '#fff';

  constructor(private authService: UserService,
              private router: Router, private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute, private headerOpacityService: HeaderOpacityService) {

    this.loggedSubscription = this.authenticationService.getMessage().subscribe(value => this.isLogged = value);
  }

  ngOnInit() {
    this.isDashboardComponent();
    this.isLogged = this.authenticationService.isLogged();
    this.headerOpacityService.dashboardToolbarColor.subscribe(
      value => this.backgroundNavbarColor = value
    );
  }

  loginIn() {
    return this.authenticationService.logged;
  }

  onLogout() {
    this.isLogged = false;
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(true);
  }

}
