import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ConfigService } from '../config.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, ConfigService]
})
export class ProfileComponent implements OnInit {
  user:User;
  baseUrl:string= '';
  
  constructor(private http: Http, private authService: UserService) { 
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.authService.userDto()
    .subscribe(heroes => this.user = heroes);
  }
}
