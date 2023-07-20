import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  private API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.handleError = this.handleError.bind(this);
  }

  handleError(error: HttpErrorResponse) {
    //  this.loader.hide();
    let errorMessage = 'Unknown error';
    if (error.status === 0) {
      errorMessage = 'Network Error';
    } else if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = error?.error?.message;
    } else if (error.status == 422) {
      let err = error.error.errors;
      if (err) {
        errorMessage = `${Object.values(err[Object.keys(err)[0]])[0]}`;
      } else {
        errorMessage = error.error.message;
      }
    } else {
      // Server-side errors
      errorMessage = `Status Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error.error ? error.error.errors : {});
  }

  // public getData(apiPath: string, data?: any) {
  //   return this.httpClient
  //     .get(`${this.API_SERVER}${apiPath}`, { params: data })
  //     .pipe(
  //       map((response:any) => {
  //         return response;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }


  public postData(apiPath: string, data?: any) {
    // if (data) {
    //   data['isNotFormdata'] = true;
    // }
    return this.httpClient
      .post(`${this.API_SERVER}${apiPath}`, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  public logOutData(apiPath: string, data?: any) {
    return this.httpClient
      .post(`${this.API_SERVER}${apiPath}`, data, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  public patchData(apiPath: string, data?: any, params?: HttpParams) {
    return this.httpClient
      .patch(`${this.API_SERVER}${apiPath}`, data, {
        headers: this.headers,
        params: params,
      })
      .pipe(catchError(this.handleError));
  }

  public putData(apiPath: string, data: any, queryParams?: any) {
    // data['isNotFormdata'] = true;
    return this.httpClient
      .put(`${this.API_SERVER}${apiPath}`, data, {
        headers: this.headers,
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  public deleteData(apiPath: string, queryParams?: any) {
    return this.httpClient
      .delete(`${this.API_SERVER}${apiPath}`, {
        headers: this.headers,
        params: queryParams,
      })
      .pipe(catchError(this.handleError));
  }

  /**For External urls Redirection*/
  public post(url: string, data?: any) {
    // data['isNotFormdata'] = true;
    return this.httpClient.post(url, data, {
      headers: new HttpHeaders({
        Accept: 'application/json;charset=utf-8',
        'Content-Type': 'application/json;charset=utf-8',
      }),
    });
  }

  /**For External urls Redirection*/
  public get(url: string, data?: any) {
    // data['isNotFormdata'] = true;
    let headers = new HttpHeaders({
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(url, { params: data, headers: headers });
  }

  public postFormData(apiPath: string, data?: any) {
    return this.httpClient.post(
      `${this.API_SERVER}${apiPath}`,
      { data: data, formData: true },
      {
        headers: new HttpHeaders({
          Accept: 'multipart/form-data',
        }),
        withCredentials: true,
      }
    );
  }

  public postUploadData(apiPath: string, data?: any) {
    return this.httpClient.post<any>(`${this.API_SERVER}${apiPath}`, data, {
      headers: new HttpHeaders({
        Accept: 'multipart/form-data',
      }),
    });
  }
}
