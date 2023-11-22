import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

mainID=  new Subject<any>();

constructor() {
  
 }

openMenu(data:any){
  this.mainID.next(data)
}
}
