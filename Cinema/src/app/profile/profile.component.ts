import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../user';
import {ConfigService} from '../config.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {UserService} from '../user.service';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {UserApiService} from '../shared/user-api.service';
import {UserModel} from '../../model/user.model';
import {NgForm} from '@angular/forms';
import {ChangePasswordModel} from '../../model/changePassword.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, ConfigService]
})
export class ProfileComponent implements OnInit {
  @ViewChild('f') singupForm: NgForm;
  @ViewChild('changePassword') changePasswordForm: NgForm;
  editFlag = false;
  isInputChange = true;
  succesEditFlag = false;

  changePasswordSuccesFlag = false;
  incorrectPasswordFlag = false;

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
  changePasswordModel: ChangePasswordModel = {
    newPassword: null,
    oldPassword: null,
  };

  constructor(private headerOpacityService: HeaderOpacityService, private userApiService: UserApiService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
    this.getActualUser();
  }

  getActualUser() {
    this.userApiService.getActualUser().subscribe(
      value => {
        this.actualUser = value.json();
        this.baseUser = value.json();
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

  changePasswordSubmit() {
    this.changePasswordModel.newPassword = this.changePasswordForm.value.newPassword;
    this.changePasswordModel.oldPassword = this.changePasswordForm.value.password;
    // console.log('form',this.changePasswordForm);
    // console.log(this.changePasswordModel);
    this.onChangePasswordRequest(this.changePasswordModel);
  }

  onChangePasswordRequest(changePassword: ChangePasswordModel) {
    this.userApiService.changePassword(changePassword).subscribe(
      value => {
        this.changePasswordSuccesFlag = true;
        console.log('zmiana');
        this.incorrectPasswordFlag = false;
        this.changePasswordForm.onReset();
      },
      error2 => {
        console.log(error2);
        this.incorrectPasswordFlag = true;
      });
    {

    }
  }

}
