import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';

import {BaseService} from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { ReplaySubject } from 'rxjs/ReplaySubject';

//import * as _ from 'lodash';
// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';
import { User } from './user';
import { Component } from '@angular/core/src/metadata/directives';

@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';
  user:User;
  userStream: ReplaySubject<User> = new ReplaySubject();

  userRx$(): Observable<User>{
    return this.userStream.asObservable();
  }

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService, private httpClient: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

    register(email: string, password: string, firstName: string, lastName: string): Observable<User> {
    let body = JSON.stringify({ email, password, firstName, lastName });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/account/register", body, options)
      .map(res => true)
      .catch(this.handleError);
  }  

   login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      this.baseUrl + '/account/login',
      JSON.stringify({ email, password }),{ headers }
      )
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('auth_token', res.token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  get isLoggedIn() {
    if (localStorage.getItem('auth_token') == undefined) {
        this.loggedIn = false;
        return this.loggedIn;
    }
    else {
        return true;
    }
  }
  
  userDto(): Observable<User> {
    let token = 'Bearer ' + localStorage.getItem('auth_token');
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json', 
    'Authorization': token})
  };
    // let options = new RequestOptions({ headers: headers });
    this.baseUrl = this.configService.getApiURI();

    return this.httpClient.get<User>(this.baseUrl + '/account/details', httpOptions);
  }

}