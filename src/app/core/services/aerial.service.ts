import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AerialService {
    aerialID = new Subject<any>();
  constructor() {}

  sendLocationID(data: any) {
    this.aerialID.next(data);
  }

  getLocationID() {
    return this.aerialID.asObservable();
  }
}
