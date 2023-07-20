import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingViewService {
  mainPageEvent=new Subject()
  constructor() { }
  sendMainPageEvent(response:boolean){
    this.mainPageEvent.next(response)
  }
  getMainPageEvent(){
   return  this.mainPageEvent.asObservable()
  }
}
