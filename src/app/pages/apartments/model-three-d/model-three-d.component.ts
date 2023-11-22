
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApartmentService } from 'src/app/core/services/apartment.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-model-three-d',
  templateUrl: './model-three-d.component.html',
  styleUrls: ['./model-three-d.component.scss'],
})
export class ModelThreeDComponent implements OnInit {
  modalUrl = 'assets/modal/index.html';
  showIframe: boolean = true;
  isLoading: boolean = true;
  floorplateCords: Array<any> = [];
  sidebarList: Array<any> = [];
  viewData: any;
  lotStatus: any;
  showView: boolean = false;
  showFloorplan: boolean = false;
  showimgSrc: boolean = true;
  imgSrc: any;
  html: any = '';
  subscription: Subscription;
  constructor(
    private socketService: SocketService,
    private ref: ChangeDetectorRef,
    private apartmentService: ApartmentService,
    private sidebarListService: SidebarService

  ) {
    this.socketService.connect();
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

    this.apartmentService.getFloarPlainImage().subscribe((res) => {
      document.getElementById('step3')?.classList.add('main-sec')
      document.getElementById('step3')?.classList.add('step_3')
      if (typeof res === 'object') {

        if (res.floorPlate) {
          this.showimgSrc = true
          //  this.showimgSrc = res.floorPlate;

          document.getElementById('active')?.classList.add('active');
          document
            .getElementById('step3')
            ?.classList.remove('main-sec-step3-view');
          document.getElementById('step3')?.classList.add('main-sec-step3');
          this.showIframe = false;
          this.showView = false;

          this.showFloorplan = false;
          this.imgSrc = res.image;
          let currentImgHeight: any = '2160';
          let currentImgWidth: any = '3840';
          this.html = this.imgSrc;
          let data: any = document.getElementById('imgID');
          data.innerHTML = this.imgSrc;

          setTimeout(() => {
            let clientHeight = data.clientHeight;
            let clientWidth = data.clientWidth;
            let resetHeight = currentImgHeight / clientHeight;
            let resetWidth = currentImgWidth / clientWidth;
            if (clientWidth === 0) {
              clientWidth = '457',
                resetHeight = currentImgWidth / clientWidth;
            }

            this.floorplateCords = this.floorplateCords.map(x => ({
              ...x,
              cordY: (((x.cordY / resetHeight) * 100 / clientHeight).toFixed(2)),
              cordX: (((x.cordX / resetWidth) * 100 / clientWidth).toFixed(2)),

            }))

            this.floorplateCords.forEach((x: any, index) => {
              this.myFunction(x.cordX, x.cordY, x.number, x.status, index)
            })
          }, 1000)




        }
        else {

          document.getElementById('step3')?.classList.add('main-sec-step3-view');
          document.getElementById('active')?.classList.add('active');
          this.showView = true;
          this.showIframe = false;
          this.showimgSrc = false;
          this.showFloorplan = false;
          this.imgSrc = res.field_315;
          this.viewData = res;
          document.getElementById('step3')?.classList.add('main-sec-step3');
        }
      } else if (res) {
        document.getElementById('active')?.classList.add('active');
        document
          .getElementById('step3')
          ?.classList.remove('main-sec-step3-view');
        document.getElementById('step3')?.classList.add('main-sec-step3');
        this.showIframe = false;
        this.showView = false;
        this.showimgSrc = false;
        this.showFloorplan = true;
        this.imgSrc = res;
      } else {
        document.getElementById('step3')?.classList.remove('main-sec')
        document.getElementById('step3')?.classList.remove('step_3')
        document.getElementById('active')?.classList.remove('active');
        this.isLoading = true;
        this.showIframe = true;
        this.showimgSrc = false;
        this.showView = false;
        this.showFloorplan = false;
        document
          .getElementById('step3')
          ?.classList.remove('main-sec-step3-view');
        document.getElementById('step3')?.classList.remove('main-sec-step3');
      }

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
    let demoDiv = document.getElementById("imgID");
    if (demoDiv) {
      demoDiv.innerHTML = this.html;
      this.html += `<div class="common_floor"  id="Floor${index}"><button class=${this.lotStatus} height='45px' width='45px' style="position:absolute;left:${x}%;top:${y}%" id=${number}>${number}</button> </div>`
      // demoDiv.innerHTML = demoDiv.innerHTML + this.html;
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

  ngOnInit(): void {

    document.getElementById('disclaimer')?.classList.add('show');
    this.showIframe = true;
  }



  checkLoading() {
    this.isLoading = false;
  }
  ngAfterViewInit() {
    this.ref.detectChanges();
  }

  disclaimer() {
    if (document.getElementById('disclaimer')?.classList.contains('show')) {
      document.getElementById('disclaimer')?.classList.remove('show')
    } else {
      document.getElementById('disclaimer')?.classList.add('show');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
