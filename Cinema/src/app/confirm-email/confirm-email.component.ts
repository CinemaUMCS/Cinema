import {Component, OnInit} from '@angular/core';
import {UserRegistrationService} from '../shared/user-registration.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private userRegistrationService: UserRegistrationService, private router: ActivatedRoute, private route: Router) {
  }

  waitingForServerFlag = true;
  errorFlag = false;
  spinnerFlag = true;

  ngOnInit() {
    this.onEmailConfirm(this.getUserId(), this.getUserToken());
    // this.onLoginPageRedirect();
  }

  getUserId() {
    return this.router.params['id'];
  }

  getUserToken() {
    return this.router.params['token'];
  }

  onEmailConfirm(id, token) {
    this.userRegistrationService.confirmEmail(id, token).subscribe(value => {
        console.log(value.statusText);
        this.waitingForServerFlag = false;
        // this.onLoginPageRedirect();
      },
      error2 => {
        this.errorFlag = true;
        this.waitingForServerFlag = false;
        console.log(error2);
        // this.onDashboardPageRedirect();
      });
  }

  onLoginPageRedirect() {
    setTimeout(value => {
        this.route.navigate(['/login']);
      }, 4000
    );
  }

  onDashboardPageRedirect() {
    setTimeout(value => {
      this.route.navigate(['/']);
    }, 4000);
  }
}
