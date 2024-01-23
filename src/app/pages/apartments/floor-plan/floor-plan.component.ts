import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APARTMENT, API_PATH, } from 'src/app/common/constants';
import { FloorplanService } from 'src/app/core/services/floorplan.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-floor-plan',
  templateUrl: './floor-plan.component.html',
  styleUrls: ['./floor-plan.component.scss'],
})
export class FloorPlanComponent implements OnInit {

  modalSrc: any;
  viewData: any;
  lotStatus: any;
  showSrc: boolean = false;
  showView: boolean = false;
  floorplateCords: any;
  showPlan: boolean = false;
  selectedId: any;
  totalSlides: any;
  private needRefresh = false;
  slidesCount: any;
  showimgSrc: boolean = true;
  html: string = '';
  slides: Array<any> = [];
  sidebarList: Array<any> = [];
  subscription: Subscription;
  totalFloorplanSlides: Array<any> = [];
  displaySlide: boolean = true;

  slideConfig = {
    rows: 2,
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  constructor(private floorService: FloorplanService, private http: HttpService, private sidebarListService: SidebarService) {
    this.subscription = this.sidebarListService.getSidebarList().subscribe((list) => {

      this.floorplateCords = [];
      this.sidebarList = [];
      this.sidebarList = list
      this.floorplateCords = list.map((x: any) => {
        return {
          cordX: x?.field_308,
          cordY: x?.field_309,
          number: x?.field_7,
          status: x?.field_9
        }
      });
    })
    this.floorService.getSliderData().subscribe((res) => {
      this.slideConfig = { ...this.slideConfig };

      if (res.length === 0 || res === "fullSlide") {
        this.displaySlide = false;
        this.slides = this.totalFloorplanSlides;
      }

    })
    this.floorService.getModal().subscribe((res) => {
      if (!res) {
        this.closeModal();
      } else {
        document.getElementById('floor-modal')?.classList.add('show');
      }
    });
    this.floorService.getFloarPlainImage().subscribe((res) => {
      if (typeof res === 'object') {
        if (res.floorPlate) {
          this.showPlan = false;
          this.showimgSrc = true;
          this.showView = false;
          this.showSrc = false;
          this.modalSrc = res.image;
          this.showPlan = false;
          let currentImgHeight: any = '2160';
          let currentImgWidth: any = '3840';
          //this.html = this.imgSrc;
          let data: any = document.querySelector('#imgID2');
          data.innerHTML = this.modalSrc;

          // data.innerHTML = this.imgSrc;

          setTimeout(() => {
            let clientHeight = data.clientHeight;
            let clientWidth = data.clientWidth;

            let resetHeight = currentImgHeight / clientHeight;
            let resetWidth = currentImgWidth / clientWidth;
            // if (clientWidth === 0) {
            //   clientWidth = '457',
            //     resetHeight = currentImgWidth / clientWidth;
            // }
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
            console.log(this.floorplateCords)
            this.floorplateCords.forEach((x: any, index: any) => {
              this.myFunction(x.cordX, x.cordY, x.number, x.status, index)
            })
          }, 1000)
        }
        else {
          this.viewData = res;
          this.showView = true;
          this.showSrc = false;
          this.modalSrc = res.field_315;
          this.showimgSrc = false;
          this.showPlan = false;
        }
      } else if (res) {
        this.showPlan = true;
        this.showView = false;
        this.showSrc = false;
        this.modalSrc = res;
        this.showimgSrc = false;
      } else {
        this.showSrc = true;
        this.showPlan = false;
        this.showView = false;
        this.showimgSrc = false;
      }
    });
  }

  ngOnInit(): void {
    this.getSlides();
    this.showSrc = true;
    this.selectedId = 'All';
  }

  getDetails(data: any) {
    this.displaySlide = false;
    this.showPlan = true;
    this.showView = false;
    this.showimgSrc = false;
    this.showSrc = false;
    document.getElementById('floor-modal')?.classList.add('show');
    this.modalSrc = `<img src=${data.src}>`;
    this.floorService.sendFloorType(data.value);
    this.floorService.openSidebar(true);

  }

  closeModal() {
    this.showSrc = true;
    document.getElementById('floor-modal')?.classList.remove('show');

  }

  getSlides() {
    this.displaySlide = true;
    this.slides = [];
    this.slideConfig = { ...this.slideConfig };
    const floorPlanCondition=[       
      // OH Condition
      { field: 'field_486', operator: 'is', value: 'Oconnell House' },
      { field: 'field_485', operator: 'is', value: '2' },]
      this.http.postData(API_PATH.GET_FLOOR_PLAN,{filters:floorPlanCondition,rows_per_page:1000}
      ).subscribe((res: any) => {
        console.log(res)
          this.slides = res?.records.map((x: any) => ({
            value: x?.field_330,
            src: x?.field_333_raw?.url
          }))
          this.totalFloorplanSlides = this.slides;
          this.slidesCount = this.slides?.length;
        });
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
    let demoDiv = document.getElementById("imgID2");
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
