import { Component,OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import {  MAIN } from 'src/app/common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  // Image url is for background image in /home  
  imageUrl = MAIN.IMAGE_URL;
  // overlay text is for text to be displayed over image in /home  
  overlayText = MAIN.OVERLAY_TEXT;
  buttons=MAIN.BUTTONS;
  JSN=JSON;


  constructor(
    private _router: Router,
  
  ) {
    // This event will hide the navbar

  }
  
  navigateRoute(path: any) {
    // This function is used for navigating to page specified in function argument
    this._router.navigate([path])
  }

  ngOnDestroy(){
    // This event will show the navbar
   
  }
  // glb = 'assets/modal/main-model.glb'

}
