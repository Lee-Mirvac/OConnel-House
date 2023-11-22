import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PAGE_ROUTES, USER_CONSTANTS } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  role = localStorage.getItem('role');

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.role === JSON.stringify(USER_CONSTANTS.USER_TYPES.SUPER_ADMIN)) {
      return true;
    } else {
      this.router.navigateByUrl(PAGE_ROUTES.AGENT_MANAGEMENT);
      return false;
    }
  }
}
