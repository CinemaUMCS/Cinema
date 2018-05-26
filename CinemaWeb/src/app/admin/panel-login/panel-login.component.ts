import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';
import {CredentialisModel} from '../../../model/credentialis.model';
import {LoggedUserModel} from '../../../model/loggedUser.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-panel-login',
  templateUrl: './panel-login.component.html',
  styleUrls: ['./panel-login.component.scss']
})
export class PanelLoginComponent implements OnInit {
  model: CredentialisModel = <CredentialisModel>{};
  private loggedUserResponse: LoggedUserModel;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.model).subscribe(
      response => {
        console.log('j');
        this.loggedUserResponse = response.json();
        console.log(this.loggedUserResponse);
        localStorage.setItem('token', this.loggedUserResponse.token);
        localStorage.setItem('role', this.loggedUserResponse.role);
        if(this.loggedUserResponse.role !== 'admin') {
          this.authService.logout();
          this.router.navigate(['../../']);
        } else {
          this.authService.userLogIn();
        }


      },
      err => {
        console.log(this.model);
        console.log("NIC BY TO Nie DALO");
        console.log(err);
      }
    );
  }
}
