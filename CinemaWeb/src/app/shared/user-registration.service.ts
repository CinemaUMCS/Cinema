import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CreateUserModel} from '../../model/createUser.model';
import {BaseHttpService} from './base-http.service';

@Injectable()
export class UserRegistrationService extends BaseHttpService {

  constructor(private http: Http) {
    super();
  }

  onRegister(createUser: CreateUserModel) {
    return this.http.post(this.setUrl('account/register'), createUser);
  }

  confirmEmail(id: string, token: string) {
    return this.http.post(this.setUrl('account/validate_token/') + id + '/' + token,null);
  }

}
