import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../user.service';
import { User } from '../user';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  providers: [UserService, ConfigService]
})
export class UserRegistrationComponent implements OnInit {
  errors: string;  
  isRequesting: boolean;
  submitted: boolean = false;
  
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
  }

  obj = {
  };

  registerUser({ value, valid }: { value: User, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    if(valid)
    {
        this.userService.register(value.email,value.password,value.firstName,value.lastName)
                  .finally(() => this.isRequesting = false)
                  .subscribe(
                    result  => {if(result){
                        this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
                    }},
                    errors =>  this.errors = errors);
    }
  }      

}
