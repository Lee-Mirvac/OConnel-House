import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { homePageConstants } from 'src/app/common/constant';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
imageUrl=homePageConstants?.imageUrl;
button=homePageConstants?.button;
imageOverlayText=homePageConstants?.imageOverlayText
constructor(private _router:Router){

}
navigateRoute(path:any){
  this._router.navigate([path])
}
}
