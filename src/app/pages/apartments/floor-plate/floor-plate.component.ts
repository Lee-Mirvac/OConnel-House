import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { API_PATH } from 'src/app/common/constants';
import { ApartmentService } from 'src/app/core/services/apartment.service';
import { FloorplateService } from 'src/app/core/services/floorplate.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-floor-plate',
  templateUrl: './floor-plate.component.html',
  styleUrls: ['./floor-plate.component.scss'],
})
export class FloorPlateComponent implements OnInit {
  imgSrc: any;
  chooseLevelText = 'Please select a level';
  viewData: any;
  showText: boolean = true;
  showSrc: boolean = false;
  showView: boolean = false;
  lotStatus: any;
  floorplateCords: Array<any> = [];
  showimgSrc: boolean = true;
  html: string = '';
  sidebarList: Array<any> = [];
  showPlan: boolean = false;
  subscription: Subscription;
  constructor(
    private floorPlateSErvice: FloorplateService,
    private http: HttpService, private sidebarListService: SidebarService
  ) {
    this.subscription = this.sidebarListService.getSidebarList()?.subscribe((list) => {
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
    this.floorPlateSErvice.getFloarPlateImage().subscribe((res: any) => {
      if (typeof res === 'object') {
        if (res.floorPlate) {
          this.showimgSrc = true;
          document
            .getElementById('step3')
            ?.classList.remove('main-sec-step3-view');
          document.getElementById('step3')?.classList.add('main-sec-step3');
          this.showView = false;
          this.showText = false;
          this.imgSrc = res.image;
          this.showPlan = false;
          let currentImgHeight: any = '2160';
          let currentImgWidth: any = '3840';
          //this.html = this.imgSrc;
          let data: any = document.querySelector('#imgID1');
          data.innerHTML = this.imgSrc;

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

            if (this.floorplateCords?.length === 0) {
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


            this.floorplateCords = this.floorplateCords?.map((x: any) => ({
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
          document.getElementById('step3')?.classList.add('main-sec-step3-view');
          this.viewData = res;
          this.showView = true;
          this.showimgSrc = false;
          this.showText = false;
          this.imgSrc = res.field_315;
          this.showPlan = false;
          document.getElementById('step3')?.classList.add('main-sec-step3');
        }
      }
      else if (res) {

        document
          .getElementById('step3')
          ?.classList.remove('main-sec-step3-view');
        document.getElementById('step3')?.classList.add('main-sec-step3');
        this.showPlan = true;
        this.showView = false;
        this.showimgSrc = false;
        this.showText = false;
        this.imgSrc = res;

      } else {
        document
          .getElementById('step3')
          ?.classList.remove('main-sec-step3-view');
        document.getElementById('step3')?.classList.remove('main-sec-step3');
        this.chooseLevelText = 'PLEASE SELECT A LEVEL';
        this.showText = true;
        this.showimgSrc = false;
        this.showPlan = false;
        this.showView = false;
      }

    });
  }

  myFunction(x: any, y: any, number: any, status: any, index: any) {
    let demoDiv = document.getElementById("imgID1");
    if (demoDiv) {
      this.html = '';

      if (status === 'Available') {
        this.lotStatus = 'icon_pos';
      } else if (status === 'Sold') {
        this.lotStatus = 'sold_pos';
      } else if (status === 'Reserved') {
        this.lotStatus = 'reserved_pos';
      } else {
        this.lotStatus = 'avail_pos';
      }
      this.html += `<div class="common_floor" id="Floor${index}" number=${number}><button class=${this.lotStatus} height='45px' width='45px'  style="position:absolute;left:${x}%;top:${y}%" id=${number}>${number}</button> </div>`;
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
          // if (event.target.classList.value.includes('bg_icon')) {
          //   event.target.classList.add('green')
          // }
          let filterData = this.sidebarList.filter((x: any) => x.field_7 === JSON.parse(event.target.id));

          this.sidebarListService.setSidebarList3(filterData)
        });
      });
    }

  }

  ngOnInit(): void {
    this.showText = true;
    this.chooseLevelText = 'PLEASE SELECT A LEVEL';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
