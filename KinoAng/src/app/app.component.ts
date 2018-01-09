import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service'

import { AuthGuard } from './auth.guard';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ConfigService } from './config.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService, ConfigService]
})
export class AppComponent implements OnInit{
  title = 'app';
  isLoggedIn$: Observable<boolean>;             

  constructor(private authService: UserService,
  private router: Router) {
}

ngOnInit(){
  this.isLoggedIn$ = this.authService.isLoggedIn; // {2}  
}

onLogout(){
  this.authService.logout();                      // {3}
}

}
