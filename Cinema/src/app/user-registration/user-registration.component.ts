import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {ConfigService} from '../config.service';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {NgForm} from '@angular/forms';
import {CreateUserModel} from '../../model/createUser.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [UserService, ConfigService]
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('f') singupForm: NgForm;
  errors: string;
  isRequesting: boolean;
  // submitted: boolean = false;
  createUser: CreateUserModel = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phoneNumber: null
  };
  password: string;
  confirmPassword: string;
  testPhoneNumber: string;

  constructor(private userService: UserService, private router: Router, private headerOpacityService: HeaderOpacityService) {
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
    this.createUser.email = this.singupForm.value.email;
    this.createUser.firstName = this.singupForm.value.firstName;
    this.createUser.lastName = this.singupForm.value.lastName;
    this.createUser.phoneNumber = this.singupForm.value.phoneNumber;
    this.createUser.password = this.singupForm.value.password;
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }

}
