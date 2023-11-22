import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { REGEX, PAGE_ROUTES, USER_CONSTANTS } from 'src/app/common/constants';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  submitted: boolean = false;
  fieldTextType: boolean = false;
  userDetails: any;
  showEyeIcon = 'assets/img/icons/pwd-show.svg';
  hideEyeIcon = 'assets/img/icons/pwd-hide.svg';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService,


  ) { }



  ngOnInit(): void {
    // this.msalService.instance.handleRedirectPromise().then((res) => {
    //   if (res != null && res.account != null) {
    //     this.msalService.instance.setActiveAccount(res.account);
    //   }
    // });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // Validators.pattern(REGEX.PASSWORD),
        ],
      ],
      remember: [false],
    });
    if (this.cookieService.get('email')) {
      let email = this.cookieService.get('email');
      let pswd = this.cookieService.get('pswd');
      this.loginForm.controls['email'].setValue(email);
      this.loginForm.controls['password'].setValue(pswd);
      this.loginForm.controls['remember'].setValue(true);
    } else {
      this.loginForm.controls['email'].setValue('');
      this.loginForm.controls['password'].setValue('');
      this.loginForm.controls['remember'].setValue(false);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userDetails = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(this.userDetails).subscribe((res: any) => {
      let userData = res?.data;
      localStorage.setItem('role', userData?.userData?.role);
      this.authService.userRole(userData?.userData?.role);
      if (this.loginForm.value.remember) {
        this.cookieService.set('email', this.userDetails.email);
        this.cookieService.set('pswd', this.userDetails.password);
      } else {
        this.cookieService.deleteAll();
      }
      this.toastr.success(res.msg);
      localStorage.setItem('token', userData.token);
      sessionStorage.setItem('isLoggedIn', 'true');

      if (userData?.userData?.role === USER_CONSTANTS.USER_TYPES.SUPER_ADMIN) {
        this.router.navigateByUrl(PAGE_ROUTES.AGENT_MANAGEMENT);
      } else {
        this.router.navigateByUrl(PAGE_ROUTES.AGENT_PERMISSION);
      }
    });

  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // backPage() {
  //   this.location.back();
  // }

}
