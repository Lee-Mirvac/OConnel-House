import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationID = new Subject<any>();
  constructor() {}

  sendLocationID(data: any) {
    this.locationID.next(data);
  }

  getLocationID() {
    return this.locationID.asObservable();
  }
}
