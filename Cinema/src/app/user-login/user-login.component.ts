import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

import {Credentials} from '../credentials';
import {UserService} from '../user.service';
import {ConfigService} from '../config.service';
import {CredentialisModel} from '../../model/credentialis.model';
import {LoggedUserModel} from '../../model/loggedUser.model';
import {AuthenticationService} from '../shared/authentication.service';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {UserApiService} from '../shared/user-api.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  providers: [UserService, ConfigService]
})
export class UserLoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  // brandNew: boolean;
  // errors: string;
  // isRequesting: boolean;
  // submitted = false;
  // credentials: Credentials = {email: '', password: ''};


  myCredent: CredentialisModel;
  credentialisError = false;
  username: string;
  password: string;
  private loggedUserResponse: LoggedUserModel;

  constructor(private userService: UserService, private router: Router,
              private activatedRoute: ActivatedRoute, private authService: AuthenticationService,
              private headerOpacityService: HeaderOpacityService, private userApiService: UserApiService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
  }

  ngOnDestroy() {
  }

  onLogin() {

    this.myCredent = {
      email: this.username,
      password: this.password
    };

    this.authService.login(this.myCredent).subscribe(
      (response) => {
        this.loggedUserResponse = response.json();
        console.log(this.loggedUserResponse);
        localStorage.setItem('token', this.loggedUserResponse.token);
        this.authService.userLogIn();
        this.setActualUser();
        this.router.navigate(['/']);

      },
      (error) => {
        this.credentialisError = true;
        console.log(this.authService.isLogged());
      }
    );
  }

  setActualUser() {
    this.userApiService.getActualUser().subscribe(
      value => {
        this.authService.actualUser = value.json();
      },
      error2 => {
        console.log(error2);
      });
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }
}

