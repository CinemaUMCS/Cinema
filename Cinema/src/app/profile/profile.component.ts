import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../user';
import {ConfigService} from '../config.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {UserService} from '../user.service';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {UserApiService} from '../shared/user-api.service';
import {UserModel} from '../../model/user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, ConfigService]
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') singupForm: NgForm;
  editFlag = false;
  isInputChange = true;
  succesEditFlag = false;

  actualUser: UserModel = {
    email: 'test@gmail.com',
    firstName: 'pawel',
    lastName: 'sos',
    role: 'user',
    id: 1
  };
  baseUser: UserModel = {
    email: 'test@gmail.com',
    firstName: 'pawel',
    lastName: 'sos',
    role: 'user',
    id: 1
  };

  constructor(private headerOpacityService: HeaderOpacityService, private userApiService: UserApiService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
    // this.getActualUser();
  }

  getActualUser() {
    this.userApiService.getActualUser().subscribe(
      value => {
        this.actualUser = value.json();
      },
      error2 => {
        console.log(error2);
      });
  }

  onEdit() {
    this.editFlag = true;
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }

  onChange() {
    this.isInputChange = false;
  }

  onSave() {
    this.editFlag = true;
    console.log(this.actualUser);
  }

  onSubmit() {
    this.baseUser.firstName = this.singupForm.value.firstName;
    this.baseUser.lastName = this.singupForm.value.lastName;
    this.baseUser.email = this.singupForm.value.email;

    this.actualUser = this.baseUser;
    console.log(this.actualUser);
  }

  onReset() {
    this.actualUser.email = this.baseUser.email;
    this.actualUser.firstName = this.baseUser.firstName;
    this.actualUser.lastName = this.baseUser.lastName;
  }

}
