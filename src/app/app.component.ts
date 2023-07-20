import { Component} from '@angular/core';
import { Router} from '@angular/router';
import { ApartmentService } from './core/services/apartment.service';
import { RoutingViewService } from './core/services/routing-view.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mirvac';
  modalUrl = 'assets/modal/index.html';
  flag: boolean = false;
  isLoading: boolean = true;
  displayModal: boolean = false;
  modalClassChange: boolean = false;
  displayHeader: boolean = true;
  showBtn: boolean = false;
  isMainPageActive=false;
  constructor( private routingViewService:RoutingViewService) {
    this.routingViewService.getMainPageEvent().subscribe((response:any)=>{
      this.isMainPageActive=response;
    })
  }
  checkLoading() {
    this.isLoading = false;
  }
}