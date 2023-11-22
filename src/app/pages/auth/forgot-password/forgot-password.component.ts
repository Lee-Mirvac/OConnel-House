import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { REGEX } from 'src/app/common/constants';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any = FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private toastr: ToastrService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],

    })

  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((res: any) => {
      this.toastr.success(res.msg);
      this.router.navigateByUrl('/login');
    }, this.errorHandler);
  }

  errorHandler(error: any) {
    this.toastr.error(error?.message);
  }

}
