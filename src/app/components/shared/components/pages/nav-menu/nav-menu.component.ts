import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navbarOptions } from 'src/app/common/constant';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  constructor(private _router:Router){}
navBarOptions=navbarOptions;
navigateRoute(path:any){
  this._router.navigate([path])
}
}
