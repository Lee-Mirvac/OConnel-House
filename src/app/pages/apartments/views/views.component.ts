import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { API_PATH } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { ViewsService } from 'src/app/core/services/views.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {
  allLevelViews = [];
  html: any = '';
  showMainContent: boolean = true;
  viewData: any;
  modalSrc: any;
  showimgSrc: boolean = false;
  showSrc: boolean = false;
  showPlan: boolean = false;
  showView: boolean = false;
  subscription: Subscription;
  floorplateCords: Array<any> = [];
  sidebarList: Array<any> = [];
  imgSrc: any;
  lotStatus: any;
  item: any;
  levelImg: Array<any> = [];
  constructor(private http: HttpService, private viewService: ViewsService, private sidebarListService: SidebarService) {
    this.subscription = this.sidebarListService.getSidebarList().subscribe((list) => {
      this.floorplateCords = [];
      this.sidebarList = [];
      this.sidebarList = list
      this.floorplateCords = list.map((x: any) => {
        return {
          cordX: x?.field_308,
          cordY: x?.field_309,
          number: x?.field_7,
          status: x.field_9
        }
      });
    })
    this.viewService.getModal().subscribe((res) => {
      if (!res) {
        document.getElementById('floor-modal')?.classList.remove('show');
        // this.getDisclaimer();
        this.showView = false;
        this.showPlan = false;
        this.showMainContent = true;
        this.showimgSrc = false;
        this.levelImg = this.allLevelViews.filter(
          (x: any) => x.field_319 === 2
        );
      }
    });
    this.viewService.getFloorLevel().subscribe((data: any) => {

      if (typeof data === 'object') {

        document
          .getElementById('floor-modal')
          ?.classList.add('main-sec-step3-view');
        this.showView = true;
        this.showMainContent = false;
        this.showPlan = false;
        document.getElementById('floor-modal')?.classList.add('show');
        this.viewData = data;
        this.modalSrc = data.field_315;
        document
          .getElementById('floor-modal')
          ?.classList.remove('main-sec-step3');
      } else {
        this.item = data;
        this.showMainContent = true;
        this.showPlan = false;
        this.showView = false;
        document.getElementById('floor-modal')?.classList.add('main-sec-step3');
        this.levelImg = this.allLevelViews.filter(
          (x: any) => x.field_319 === data
        );
        document
          .getElementById('floor-modal')
          ?.classList.remove('main-sec-step3-view');
      }
    });

    this.viewService.getViewImage().subscribe((res: any) => {

      if (typeof res === 'object') {
        if (res.floorPlate) {
          this.showimgSrc = true;
          this.showView = false;
          this.modalSrc = res.image;
          this.imgSrc = res.image;
          this.showPlan = false;
          document.getElementById('floor-modal')?.classList.add('main-sec-step3');
          document
            .getElementById('floor-modal')
            ?.classList.remove('main-sec-step3-view');
          let currentImgHeight: any = '2160';
          let currentImgWidth: any = '3840';
          //this.html = this.imgSrc;
          let data: any = document.querySelector('#imgID4');
          data.innerHTML = this.imgSrc;

          // data.innerHTML = this.imgSrc;

          setTimeout(() => {
            let clientHeight = data.clientHeight;
            let clientWidth = data.clientWidth;

            let resetHeight = currentImgHeight / clientHeight;
            let resetWidth = currentImgWidth / clientWidth;
            if (this.floorplateCords.length === 0) {
              this.subscription = this.sidebarListService.getSidebarList().subscribe((list) => {
                this.floorplateCords = [];
                this.floorplateCords = list.map((x: any) => {
                  return {
                    cordX: x?.field_308,
                    cordY: x?.field_309,
                    number: x?.field_7,
                    status: x?.field_9
                  }
                });
              })
            }
            this.floorplateCords = this.floorplateCords.map((x: any) => ({
              ...x,
              cordY: (((x.cordY / resetHeight) * 100 / clientHeight).toFixed(2)),
              cordX: (((x.cordX / resetWidth) * 100 / clientWidth).toFixed(2)),

            }))

            this.floorplateCords.forEach((x: any, index: any) => {
              this.myFunction(x.cordX, x.cordY, x.number, x.status, index)
            })
          }, 1000)
        }
        else {
          document
            .getElementById('floor-modal')
            ?.classList.add('main-sec-step3-view');
          this.showView = true;
          this.showPlan = false;
          this.showimgSrc = false;
          this.viewData = res;
          this.modalSrc = res.field_315;
          document
            .getElementById('floor-modal')
            ?.classList.remove('main-sec-step3');
        }
      } else {
        document.getElementById('floor-modal')?.classList.add('main-sec-step3');
        this.showView = false;
        this.modalSrc = res;
        this.showimgSrc = false;
        this.showPlan = true;
        document
          .getElementById('floor-modal')
          ?.classList.remove('main-sec-step3-view');
      }
    });
  }

  ngOnInit(): void {
    // this.getDisclaimer();
    document.getElementById('disclaim')?.classList.add('show');
    this.http
      .get(API_PATH.GET_BUILDING_VIEWS + `?rows_per_page=100`)
      .subscribe((res: any) => {
        this.showMainContent = true;
        this.allLevelViews = res.records;
        this.levelImg = this.allLevelViews.filter(
          (x: any) => x.field_319 === 2
        );
      });
  }

  disclaimer() {
    document.getElementById('disclaim')?.classList.remove('show');
    // sessionStorage.setItem('disclaimer', 'true');
  }

  // getDisclaimer() {
  //   let disclaimer = sessionStorage.getItem('disclaimer');
  //   if (disclaimer) {
  //     document.getElementById('disclaim')?.classList.remove('show');
  //   } else {
  //     document.getElementById('disclaim')?.classList.add('show');
  //   }
  // }
  closeModal() {
    this.showMainContent = true;
    this.showPlan = false;
    this.showView = false;
    this.levelImg = this.allLevelViews.filter(
      (x: any) => x.field_319 === this.item
    );

    this.viewService.hideModal(true);
    document.getElementById('floor-modal')?.classList.remove('show');
  }
  myFunction(x: any, y: any, number: any, status: any, index: any) {
    if (status === 'Available') {
      this.lotStatus = 'icon_pos';
    } else if (status === 'Sold') {
      this.lotStatus = 'sold_pos';
    } else if (status === 'Reserved') {
      this.lotStatus = 'reserved_pos';
    } else {
      this.lotStatus = 'avail_pos';
    }
    let demoDiv = document.getElementById("imgID4");
    if (demoDiv) {
      this.html = '';
      this.html += `<div class="common_floor" id="Floor${index}"><button class=${this.lotStatus} height='45px' width='45px' style="position:absolute;left:${x}%;top:${y}%" id=${number}>${number}</button> </div>`;
      demoDiv.innerHTML = demoDiv.innerHTML + this.html;
      const divs = document.querySelectorAll('.common_floor');
      divs.forEach(box => {
        box.addEventListener('click', (event: any) => {
          divs.forEach((box: any) => {
            if (box.children[0].id !== event.target.id) {
              document.getElementById(box.children[0].id)?.classList.remove('bg_icon')
            }

          }),
            event.target.classList.toggle('bg_icon');
          let filterData = this.sidebarList.filter((x: any) => x.field_7 === JSON.parse(event.target.id));

          this.sidebarListService.setSidebarList3(filterData)
        });
      });
    }

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
