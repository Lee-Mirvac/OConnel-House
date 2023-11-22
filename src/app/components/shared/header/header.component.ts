import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { APIS, HEADER, PAGE_ROUTES, USER_CONSTANTS } from 'src/app/common/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { MainHttpService } from 'src/app/core/services/main-http.service';
import { SweetService } from 'src/app/core/services/sweet.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menu_list = HEADER.LIST_VIEW;
  showLogout: boolean = false;
  home_icon = "assets/img/logo.svg";
  selectedID: any;
  role: any;
  roleBased: any;
  showHeader=true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: MainHttpService,
    private toastr: ToastrService,
    private swal: SweetService,
    private authService: AuthService,) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    // if (this.role) {
    //   this.role = JSON.parse(this.role);
    // }
    if (sessionStorage.getItem('isLoggedIn') == 'true') {
      this.showLogout = true;
    } else {
      this.showLogout = false;
    }
    this.authService.role.subscribe((res) => {
      this.role = res;
      localStorage.setItem('role', res);

      if (this.role === USER_CONSTANTS.USER_TYPES.SUPER_ADMIN) {
        this.roleBased = 'Admin';
      } else {
        this.roleBased = 'Agent';
      }
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if(event?.url=='/'){
          this.showHeader=false
        }
        else{
          this.showHeader=true;
        }
        var data = (event.url).substring(1);
        if (data) {
          if (data.includes('masterplan')) {
            this.selectedID = "masterplan"
          } else if (data.includes('gallery')) {
            this.selectedID = "gallery"
          }

          else if (data.includes('mirvac')) {
            this.selectedID = "mirvac"
          }
          else if (data.includes('amenity')) {
            this.selectedID = "amenity"
          }
          else if (data.includes('apartments')) {
            this.selectedID = "apartments"
          }
          else {

          }
        }
      })
  }

  checkID(id?: any) {
    this.selectedID = id;
    let element = document.getElementById(id);
    element?.classList.toggle("active");
    // document.getElementById('sub')?.classList.add('active')
  }

  myFunction1() {
    let element = document.getElementById("main-menu");
    element?.classList.toggle("show");
    let data = document.getElementById("hemp");
    data?.classList.toggle("active");
  }

  navLogin() {
    // this.router.navigateByUrl(PAGE_ROUTES.LOGIN);
  }
  async logout() {
    let swal_data = await this.swal.logoutSwal();

    if (swal_data.value) {

      this.role = JSON.parse(this.role);

      this.http.logOutData(APIS.AUTH.LOGOUT).subscribe((res: any) => {
        this.toastr.success(res?.msg);
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate([PAGE_ROUTES.HOME]);
      });

    }
  }
}
