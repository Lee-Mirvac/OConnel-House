import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  totalApartments = new Subject<any>();
  list = new Subject<any>();
  constructor() { }

  setSidebarList(list: any) {
    this.totalApartments.next(list);

  }

  getSidebarList() {
    return this.totalApartments.asObservable();
  }

  setSidebarList3(item: any) {
    this.list.next(item)
  }
  getSidebarList3() {
    return this.list.asObservable();
  }
}
