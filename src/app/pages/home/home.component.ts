import { Component,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { HEADER, HOME } from 'src/app/common/constants';
import { RoutingViewService } from 'src/app/core/services/routing-view.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  imageUrl=HOME.IMAGE_URL;
  overlayText=HOME.OVERLAY_TEXT;
  navBarOptions=HEADER.LIST_VIEW
  constructor
  (
    private _router:Router,
    private routingViewService:RoutingViewService
  ) 
  {
   this.routingViewService.sendMainPageEvent(true);
   
  }
  
  navigateRoute(path: any) {
    this._router.navigate([path])
  }

  ngOnDestroy(){
    this.routingViewService.sendMainPageEvent(false);
  }
  // glb = 'assets/modal/main-model.glb'

}
