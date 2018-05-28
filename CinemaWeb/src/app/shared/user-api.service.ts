import {Injectable} from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {Headers, Http} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {ChangePasswordModel} from '../../model/changePassword.model';
import {HttpParams} from '@angular/common/http';
import {UserModel} from '../../model/user.model';

@Injectable()
export class UserApiService extends BaseHttpService {

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    super();
  }

  getActualUser() {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    return this.http.get(this.setUrl('account/details'), {headers: header});
  }

  changePassword(changePasswordModel: ChangePasswordModel) {
    const header = new Headers({'Authorization': this.authenticationService.getToken()});
    return this.http.put(this.setUrl('account/changePassword'), changePasswordModel, {headers: header});
  }

  forgotPassword(email: string) {
    let body = new HttpParams();
    body = body.set('userEmail', email);
    return this.http.put(this.setUrl('account/reset_password?userEmail=') + email, null);
  }

  updateUser(user: UserModel) {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    return this.http.put(this.setUrl('account'), user, {headers: header});
  }

}
