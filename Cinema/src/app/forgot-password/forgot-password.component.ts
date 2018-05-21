import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {UserApiService} from '../shared/user-api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('f') resetPasswordForm: NgForm;

  succesFlag = false;
  errorFlag = false;

  constructor(private headerOpacityService: HeaderOpacityService, private userApiService: UserApiService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
  }

  onSubmit() {
    console.log(this.resetPasswordForm.value.email);
    this.userApiService.forgotPassword(this.resetPasswordForm.value.email).subscribe(
      value => {
        this.succesFlag = true;
        this.errorFlag = false;
        this.resetPasswordForm.onReset();
      },
      error2 => {
        this.succesFlag = false;
        this.errorFlag = true;
        console.log(error2);
      });
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }
}
