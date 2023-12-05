import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  emailArray = new Subject();
  constructor() { }

  emailData(data: any) {
    this.emailArray.next(data)
  }

  getEmailData() {
    return this.emailArray.asObservable();
  }
}
