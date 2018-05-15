import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {ConfigService} from '../config.service';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {NgForm} from '@angular/forms';
import {CreateUserModel} from '../../model/createUser.model';
import {UserRegistrationService} from '../shared/user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [UserService, ConfigService]
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('f') singupForm: NgForm;
  errors: string;
  succesRegistrationFlag = false;
  errorRegistrationFlag = false;
  isRequesting: boolean;
  // submitted: boolean = false;
  progressBarFlag = false;
  createUser: CreateUserModel = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phoneNumber: null
  };
  errorMessage: string;

  constructor(private userService: UserService, private router: Router, private headerOpacityService: HeaderOpacityService, private userRegistrationService: UserRegistrationService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
  }

  // registerUser({value, valid}: { value: User, valid: boolean }) {
  //   this.submitted = true;
  //   this.isRequesting = true;
  //   this.errors = '';
  //   if (valid) {
  //     this.userService.register(value.email, value.password, value.firstName, value.lastName)
  //       .finally(() => this.isRequesting = false)
  //       .subscribe(
  //         result => {
  //           if (result) {
  //             this.router.navigate(['/login'], {queryParams: {brandNew: true, email: value.email}});
  //           }
  //         },
  //         errors => this.errors = errors);
  //   }
  // }

  onSubmit() {
    this.setCreateUserValue();
    this.progressBarFlag = true;
    this.onRegister(this.createUser);
  }

  setCreateUserValue() {
    this.createUser.email = this.singupForm.value.email;
    this.createUser.firstName = this.singupForm.value.firstName;
    this.createUser.lastName = this.singupForm.value.lastName;
    this.createUser.phoneNumber = this.singupForm.value.phoneNumber;
    this.createUser.password = this.singupForm.value.password;
  }

  onRegister(user: CreateUserModel) {
    setTimeout(() => {
        this.userRegistrationService.onRegister(user).subscribe(value => {
            this.progressBarFlag = false;
            this.succesRegister();
          },
          error2 => {
            this.progressBarFlag = false;
            this.errorRegister();
            console.log(error2);
          });
      }, 1000
    );
  }

  succesRegister() {
    this.succesRegistrationFlag = true;
    this.errorRegistrationFlag = false;
    setTimeout(() => {
      this.router.navigate(['']);
    }, 5000);
  }

  errorRegister() {
    this.errorRegistrationFlag = true;
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }

}
