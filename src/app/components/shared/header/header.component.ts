import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ROUTES, Router } from '@angular/router';
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
  role:any = localStorage.getItem('role');
  roleBased: any;
  showHeader=true;
  list: any;
  emailCount: any;
  roles = USER_CONSTANTS.USER_TYPES;
  newArray: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: MainHttpService,
    private toastr: ToastrService,
    private swal: SweetService,
    private authService: AuthService,) { 
     
    }

  ngOnInit(): void {
    this.list = HEADER.LIST_VIEW;
        this.role = localStorage.getItem('role');
        if (this.role) {
          this.role = JSON.parse(this.role);
        }
        if (sessionStorage.getItem('isLoggedIn') == 'true') {
          this.showLogout = true;
        } else {
          this.role = '';
          this.showLogout = false;
        }

        if (this.role === USER_CONSTANTS.USER_TYPES.SUPER_ADMIN) {
          this.roleBased = 'Admin';

          if (this.menu_list) {
            this.menu_list.forEach((x:any) => {
              // if (x.id == 'admin') {
                x.isDisplay = true
              // }
            });
          }
        } else if (this.role === USER_CONSTANTS.USER_TYPES.AGENT) {
          this.roleBased = 'Agent';
          this.menu_list.forEach((x:any) => {
            if (x?.id == 'agent') {
              x.isDisplay = true
            }
          });
        } else {
          this.selectedID = '';
          this.menu_list = this.menu_list.map((x: any) => ({
            ...x,
            isDisplay: x.id === 'admin' ? false : x.id === 'agent' ? false : true
          }));

        }

        let getEmailData: any = localStorage.getItem('emailData');
        let galleyItems: any = localStorage.getItem('galleryItem');
    
        if (getEmailData) {
          getEmailData = JSON.parse(getEmailData);
          this.newArray = getEmailData;
        }
        if (galleyItems) {
          galleyItems = JSON.parse(galleyItems);
          this.newArray = galleyItems;
        }
    
        if (getEmailData?.length && galleyItems?.length > 0) {
          this.newArray = getEmailData.concat(galleyItems);
        }
    
        if (this.newArray) {
          let emailCounts = [...new Map(this.newArray.map((item: any) => [item.level, item])).values()].length;
          if (emailCounts > 0) {
            this.emailCount = emailCounts;
          } else {
            this.emailCount = ''
          }
        }
    

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
        debugger
        if(event?.url=='/'){
          this.showHeader=false;
        }
        else{
          this.showHeader=true;
        }
        this.list = HEADER.LIST_VIEW;
        this.role = localStorage.getItem('role');
        if (this.role) {
          this.role = JSON.parse(this.role);
        }
        if (sessionStorage.getItem('isLoggedIn') == 'true') {
          this.showLogout = true;
        } else {
          this.role = '';
          this.showLogout = false;
        }

        if (this.role === USER_CONSTANTS.USER_TYPES.SUPER_ADMIN) {
          this.roleBased = 'Admin';

          if (this.menu_list) {
            this.menu_list.forEach(x => {
              if (x.id == 'admin') {
                x.isDisplay = true
              }
            });
          }
        } else if (this.role === USER_CONSTANTS.USER_TYPES.AGENT) {
          this.roleBased = 'Agent';
          this.menu_list.forEach(x => {
            if (x.id == 'agent') {
              x.isDisplay = true
            }
          });
        } else {
          this.selectedID = '';
          this.menu_list = this.menu_list.map((x: any) => ({
            ...x,
            isDisplay: x.id === 'admin' ? false : x.id === 'agent' ? false : true
          }));

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
          else if (data.includes('admin')) {
            this.selectedID = "admin"
          }
          else if (data.includes('agent')) {
            this.selectedID = "agent"
          }
          else if (data.includes('login')) {
            // localStorage.clear()
            this.emailCount = ''
          }
          else {
            this.selectedID=''
          }
        }
      })
  }

  checkID(id?: any) {
    try{
    this.selectedID = id;
    let element = document.getElementById(id);
    element?.classList.toggle("active");
    // document.getElementById('sub')?.classList.add('active')
    }catch(e){console.log(e)}
  }

  myFunction1() {
    let element = document.getElementById("main-menu");
    element?.classList.toggle("show");
    let data = document.getElementById("hemp");
    data?.classList.toggle("active");
  }

  navLogin() {
    this.router.navigateByUrl(PAGE_ROUTES.LOGIN);
  }
  async logout() {
    let swal_data = await this.swal.logoutSwal();

    if (swal_data.value) {

      this.role = JSON.parse(this.role);

      this.http.logOutData(APIS.AUTH.LOGOUT).subscribe((res: any) => {
        this.toastr.success(res?.msg);
        localStorage.clear();
        sessionStorage.clear();
        this.showLogout = false;
        this.router.navigate(['']);
      });

    }
  }

  navToEmail() {
    let data = ''
    if (this.role === this.roles.AGENT) {
      data = 'agent'
      this.router.navigate(['/agent/email']);
    } else if (this.role === this.roles.SUPER_ADMIN) {
      data = 'admin'
      this.router.navigate(['/admin/email'])
    }

  }
  buttonPress() {
    let getEmailData: any = localStorage.getItem('emailData');
    let galleyItems: any = localStorage.getItem('galleryItem');

    if (getEmailData) {
      getEmailData = JSON.parse(getEmailData);
      this.newArray = getEmailData;
    }
    if (galleyItems) {
      galleyItems = JSON.parse(galleyItems);
      this.newArray = galleyItems;
    }

    if (getEmailData?.length && galleyItems?.length > 0) {
      this.newArray = getEmailData.concat(galleyItems);
    }

    if (this.newArray) {
      let emailCounts = [...new Map(this.newArray.map((item: any) => [item.level, item])).values()].length;
      if (emailCounts > 0) {
        this.emailCount = emailCounts;
      }
    }

  }

}
