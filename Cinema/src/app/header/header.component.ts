import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';

import {AuthGuard} from '../auth.guard';
import {ConfigService} from '../config.service';
import {AuthenticationService} from '../shared/authentication.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService, ConfigService]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: boolean;
  private href: string;

  private isLogged: boolean;
  private loggedSubscription: Subscription;

  constructor(private authService: UserService,
              private router: Router, private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute) {
    // this.href = this.router.url;
    // console.log(this.href);
    this.loggedSubscription = this.authenticationService.getMessage().subscribe(value => this.isLogged = value);
  }

  ngOnInit() {
    // this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
    this.isLogged = this.authenticationService.isLogged();
    // this.activatedRoute.params.subscribe(paramsId => {
    //   console.log(paramsId);
    // });
  }

  // onLogout() {
  //   this.authService.logout();                      // {3}
  // }
  loginIn() {
    return this.authenticationService.logged;
  }

  onLogout() {
    this.isLogged = false;
    this.authenticationService.logout();
  }

}
