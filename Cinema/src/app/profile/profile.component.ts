import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {ConfigService} from '../config.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {UserService} from '../user.service';
import {HeaderOpacityService} from '../shared/header-opacity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, ConfigService]
})
export class ProfileComponent implements OnInit {
  editFlag = true;

  constructor(private headerOpacityService: HeaderOpacityService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
  }

  onEdit() {
    this.editFlag = false;
  }

  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }
}
