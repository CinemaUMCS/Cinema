import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
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
import {NgForm} from '@angular/forms';
import {ServerResponseError} from '../../model/server-response-error';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  providers: [UserService, ConfigService]
})
export class UserLoginComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;

  progressBarFlag = false;
  errorFlag = false;

  myCredent: CredentialisModel = {
    email: null,
    password: null
  };
  credentialisError = false;
  errorText: string;
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

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorText = 'Błąd, niepoprawne dane!';
      this.errorFlag = true;
      return;
    }
    this.onLogin();
  }

  onLogin() {
    this.progressBarFlag = true;
    setTimeout(() => {
      this.setCredentialisModelFromForm();
      this.authService.login(this.myCredent).subscribe(
        (response) => {
          this.loggedUserResponse = response.json();
          localStorage.setItem('token', this.loggedUserResponse.token);
          this.authService.userLogIn();
          this.progressBarFlag = false;
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error.json());
          this.progressBarFlag = false;
          this.onErrorLogin(error.json());
        }
      );
    }, 1000);

  }

  onErrorLogin(errorModel: ServerResponseError) {
    if (errorModel.errorCode === 'InvalidCredentials') {
      this.errorText = 'Niepoprawny login lub hasło';
    } else {
      this.errorText = 'Adres email nie został potwierdzony';
    }
    this.errorFlag = true;
  }

  setCredentialisModelFromForm() {
    this.myCredent.email = this.registerForm.value.email;
    this.myCredent.password = this.registerForm.value.password;
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }
}

