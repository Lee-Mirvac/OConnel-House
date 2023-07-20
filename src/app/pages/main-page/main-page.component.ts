import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MAIN } from 'src/app/common/constants';
import { RoutingViewService } from 'src/app/core/services/routing-view.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnDestroy {
  imageUrl=MAIN.IMAGE_URL;
  overlayText=MAIN.OVERLAY_TEXT;
  buttons=MAIN.BUTTONS;
JSN=JSON;

  constructor(private routingViewService:RoutingViewService,
              private _router:Router) { 
    routingViewService.sendMainPageEvent(true);
  }

  ngOnDestroy() {
    this.routingViewService.sendMainPageEvent(false)
  }
  navigateRoute(path:any){
    this._router.navigate([path])
  }
}
