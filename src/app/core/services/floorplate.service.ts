import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FloorplateService {
  private floorplateImg = new Subject<any>();
  constructor() { }
  floorType = new Subject<any>();
  openModal = new Subject<boolean>();

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

  sendFloorPlateImg(data: any) {
    this.floorplateImg.next(data);

  }

  getFloarPlateImage() {
    return this.floorplateImg.asObservable();
  }
}
