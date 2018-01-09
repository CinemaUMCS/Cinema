import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service'

import { AuthGuard } from '../auth.guard';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService, ConfigService]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: boolean;             
  
  constructor(private authService: UserService,
    private router: Router) { }

  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}  
  }
  
  onLogout(){
    this.authService.logout();                      // {3}
  }

}
