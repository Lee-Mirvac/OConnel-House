import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/components/shared/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    public toastr: ToastrService,
    public spinner: SpinnerService
  ) { }

  /** Request interceptor **/
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.showSpinner();
    let lastResponse: HttpEvent<any>;
    let error: HttpErrorResponse;
    // Clone the request to add the new header.

    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set('authorization', token),
      });
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const message = event.body.msg;
            this.spinner.HideSpinner(); // hide spinner.
          }
        },
        async (err: any) => {
          error = err;
          const status = err.status;
          const message = err.error.msg;
          this.spinner.HideSpinner();
          if (status === 401) {
            localStorage.clear();
            this.toastr.error(err?.error?.msg);
            // alert('success')
            //   this.router.navigateByUrl(`/${PAGE_ROUTES.LOGIN}`);
          } else if (status === 500) {
            if (err.error.msg === 'Request failed with status code 401') {
            } else if (err.error.msg === 'authorization is required') {
              localStorage.clear();
              this.toastr.error('Token is expired please login again.');
              //  this.router.navigateByUrl();
            }
          } else if (status === 0) {
            this.toastr.error('Please Check Your Internet Connection');
          } else {
            this.toastr.error(message);
          }
        }
      )
    );
  }
}
