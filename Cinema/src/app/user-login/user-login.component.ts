import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../credentials';
import { UserService } from '../user.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  providers: [UserService, ConfigService]
})
export class UserLoginComponent implements OnInit, OnDestroy {
  
    private subscription: Subscription;
  
    brandNew: boolean;
    errors: string;
    isRequesting: boolean;
    submitted: boolean = false;
    credentials: Credentials = { email: '', password: '' };
  
    constructor(private userService: UserService, private router: Router,private activatedRoute: ActivatedRoute) { }
  
      ngOnInit() {
  
      // subscribe to router event
      this.subscription = this.activatedRoute.queryParams.subscribe(
        (param: any) => {
           this.brandNew = param['brandNew'];   
           this.credentials.email = param['email'];         
        });      
    }
  
     ngOnDestroy() {
      // prevent memory leak by unsubscribing
      this.subscription.unsubscribe();
    }
  
    login({ value, valid }: { value: Credentials, valid: boolean }) {
      this.submitted = true;
      this.isRequesting = true;
      this.errors='';
      if (valid) {
        this.userService.login(value.email, value.password)
          .finally(() => this.isRequesting = false)
          .subscribe(
          result => {         
            if (result) {
               this.router.navigate(['/dashboard']);             
            }
          },
          error => this.errors = error);
      }
    }
}
