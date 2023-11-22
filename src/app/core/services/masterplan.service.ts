import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterplanService {
  masterPlanAerialID = new Subject<any>();
  constructor() {}

  sendLocationID(data: any) {
    this.masterPlanAerialID.next(data);
  }

  getLocationID() {
    return this.masterPlanAerialID.asObservable();
  }
}
