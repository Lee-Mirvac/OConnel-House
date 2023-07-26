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
  // Image url is for background image in /home  
  imageUrl = HOME.IMAGE_URL;
  // overlay text is for text to be displayed over image in /home  
  overlayText = HOME.OVERLAY_TEXT;
  // navBarOptions variable accepts an array of objects containing options for nav /home  
  navBarOptions = HEADER.LIST_VIEW


  constructor(
    private _router: Router,
    private routingViewService: RoutingViewService
  ) {
    // This event will hide the navbar
    this.routingViewService.sendMainPageEvent(true);

  }
  
  navigateRoute(path: any) {
    // This function is used for navigating to page specified in function argument
    this._router.navigate([path])
  }

  ngOnDestroy(){
    // This event will show the navbar
    this.routingViewService.sendMainPageEvent(false);
  }
  // glb = 'assets/modal/main-model.glb'

}
