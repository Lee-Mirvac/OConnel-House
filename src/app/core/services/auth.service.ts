import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { APIS, PAGE_ROUTES } from 'src/app/common/constants';
import { HttpService } from './http.service';
import { MainHttpService } from './main-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: MainHttpService) { }

  role = new Subject<any>();

  userRole(data: any) {
    this.role.next(data);
  }

  isAuthenticated() { }

  login(data: any) {
    return this.httpService.postData(APIS.AUTH.LOGIN, data);
  }
  msLogin(data: any) {
    return this.httpService.postData(APIS.msLogin.msalLogin, data);
  }
  forgotPassword(data: any) {
    return this.httpService.postData(APIS.AUTH.FORGOT_PASSWORD, data);
  }

  verifyToken(data: any) {
    return this.httpService.postData(APIS.AUTH.VERIFY_TOKEN, data);
  }

  setupPassword(data: any) {
    return this.httpService.postData(APIS.AUTH.SETUP_PASSWORD, data);
  }

  userResetPassword(data: any) {
    return this.httpService.postData(APIS.AUTH.RESET_PASSWORD, data);
  }

  // profileDetails() {
  //   return this.httpService.getData(APIS.AUTH.PROFILE_DETAILS);
  // }

  changePassword(data: any) {
    return this.httpService.putData(APIS.AUTH.CHANGE_PASSWORD, data);
  }
}
