import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HeaderOpacityService} from '../shared/header-opacity.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;

  succesFlag = false;

  constructor(private headerOpacityService: HeaderOpacityService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
  }

  onSubmit() {

  }
  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }
}
