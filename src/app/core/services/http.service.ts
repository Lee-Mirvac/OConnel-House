import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = 'https://api.knack.com/v1/objects';
  // API_KEY = '9d68237e-8640-4c69-bf24-9427830ecb97';
  // APPLICATION_ID = '623bc5f90a90ad001f2ced53';
  API_KEY = '79f46fe9-492e-42a2-bc27-5bc680f2da72';
  APPLICATION_ID = '656eab0f16c55700294de6e4';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'X-Knack-Application-Id': this.APPLICATION_ID,
    // 'X-Knack-REST-API-KEY': this.API_KEY,
  });
  private API_SERVER = environment.apiUrl+'/v1/knack/data';

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

  public getData(apiPath: string, data?: any) {
    return this.httpClient
      .get(`${this.API_SERVER}${apiPath}`, { params: data })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  public postUploadData(apiPath: string, data?: any) {
    return this.httpClient.post<any>(`${this.API_SERVER}${apiPath}`, data, {
      headers: new HttpHeaders({
        Accept: 'multipart/form-data',
      }),
    });
  }

  public postData(apiPath: string, data?: any) {
    delete data?.['limit'];
    delete data?.['rows_per_page']
    // debugger
    console.warn(apiPath,data,{object:apiPath?.split('/').length>2?apiPath?.split('/')[1]:apiPath})
    return this.httpClient
      .post(`${this.API_SERVER}`, {...data,...(apiPath&&{object:apiPath?.split('/').length>2?apiPath?.split('/')[1]:apiPath})}, { headers: this.headers })
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
    return this.httpClient.post(url, data, {
      headers: new HttpHeaders({
        Accept: 'application/json;charset=utf-8',
        'Content-Type': 'application/json;charset=utf-8',
      }),
    });
  }

  /**For External urls Redirection*/
  public get(apiPath: string, data?: any) {
    return this.httpClient.get(`${this.API_SERVER}${apiPath}`, {
      params: data,
      headers: this.headers,
    });
  }

  public postFormData(apiPath: string, data?: any) {
    return this.httpClient.post(`${this.API_SERVER}${apiPath}`, data, {
      headers: new HttpHeaders({
        Accept: 'multipart/form-data',
      }),
      withCredentials: true,
    });
  }
}

export const emitEvent = (name?: any, data?: any) => {
  let event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
};
