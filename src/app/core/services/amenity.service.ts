import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AmenityService {
  rooftopID = new Subject<any>();
  constructor() {}

  sendAmenityID(data: any) {
    this.rooftopID.next(data);
  }

  getAmenityID() {
    return this.rooftopID.asObservable();
  }
}
