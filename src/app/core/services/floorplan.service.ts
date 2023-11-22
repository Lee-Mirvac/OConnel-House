import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FloorplanService {
  private floorplanImg = new Subject<any>();
  private sidebar = new Subject<any>();
  private sliderData = new Subject<any>();
  private slickData = new Subject<any>();

  constructor() { }

  floorType = new Subject<any>();
  openModal = new Subject<boolean>();

  sendFloorType(data: any) {
    this.floorType.next(data);
  }

  getFloorType() {
    return this.floorType.asObservable();
  }

  hideModal(data: any) {
    this.openModal.next(data);
  }
  getModal() {
    return this.openModal.asObservable();
  }

  sendImg(data: any) {
    this.floorplanImg.next(data);
  }

  getFloarPlainImage() {
    return this.floorplanImg.asObservable();
  }

  openSidebar(data: any) {
    this.sidebar.next(data)
  }

  getSidebar() {
    return this.sidebar.asObservable();
  }

  setSliderData(data: any) {
    this.sliderData.next(data)
  }

  getSliderData() {
    return this.sliderData.asObservable();
  }

  sendSlickData(data: any) {
    this.slickData.next(data,)
  }
  getSlickData() {
    return this.slickData.asObservable();
  }
}
