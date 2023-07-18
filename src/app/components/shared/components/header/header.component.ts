import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { navbarOptions } from 'src/app/common/constant';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private _router:Router
  ){}
  navBarOptions=navbarOptions
  navigateRoute(path:any){
    this._router.navigate([path])
  }
}
