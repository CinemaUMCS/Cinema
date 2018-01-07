import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';
import { User } from '../user'

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  model:User;
  
  constructor(protected http: HttpClient) { }

  ngOnInit() {
  }

  obj = {"mode": "raw",
  "raw":"\"{Email\": model.email, \"FirstName\": model.name,\"LastName\":model.name,\"Password\": model.password+\"}\""};

  postJson(): Observable<any> {
    return this.http.post('http://localhost:5000/account/register', JSON.stringify(this.obj), {headers:{'Content-Type': 'application/json'}})
    }

}
