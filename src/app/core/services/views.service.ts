import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewsService {
  private viewImg = new Subject<any>();
  constructor() {}
  floorType = new Subject<any>();
  openModal = new Subject<boolean>();
  floorLevel = new Subject<boolean>();

  // sendFloorType(data: any) {
  //   this.floorType.next(data);
  // }

  // getFloorType() {
  //   return this.floorType.asObservable();
  // }

  hideModal(data: any) {
    this.openModal.next(data);
  }
  getModal() {
    return this.openModal.asObservable();
  }

  sendViewImg(data: any) {
    this.viewImg.next(data);
  }

  getViewImage() {
    return this.viewImg.asObservable();
  }

  sendFloorLevel(data: any) {
    this.floorLevel.next(data);
  }

  getFloorLevel() {
    return this.floorLevel.asObservable();
  }
}
