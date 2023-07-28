
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {  NgxQrcodeElementTypes,  NgxQrcodeErrorCorrectionLevels} from '@techiediaries/ngx-qrcode';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { API_PATH,  LOCATION, MASTERPLAN} from 'src/app/common/constants';
import { ApartmentService } from 'src/app/core/services/apartment.service';
import { FloorplanService } from 'src/app/core/services/floorplan.service';
import { FloorplateService } from 'src/app/core/services/floorplate.service';
import { HttpService } from 'src/app/core/services/http.service';
import { IframeService } from 'src/app/core/services/iframe.service';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { ViewsService } from 'src/app/core/services/views.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  sideMenu: any = LOCATION.SIDE_MENU;
  masterPlanMenu: any = MASTERPLAN.SIDE_MENU;
  title: any;
  status: boolean = true;
  id: any;
  lotPdfUrl: any;
  pathColor = [false];
  aerialPathColor = [true, true, true, true, true, true];
  showMenu: boolean = false;
  locationMenu: boolean = true;
  apartmentSidebar: boolean = false;
  selectedID: any;
  displayQR: boolean = true;
  displayCloseBtn: boolean = false;
  showMasterPlanMenu: boolean = false;
  floorLevel: Array<any> = [];
  checkFloorPlan: boolean = false;
  floorDetails: any;
  bedroomSet: Array<any> = [];
  apartmentType: Array<any> = [];
  selectedBed: Array<any> = [];
  selectedLevel: Array<any> = [];
  allBedroomSet: Array<any> = [];
  masterAllSelected: boolean = false;
  masterSelected: boolean = false;
  floorSelected: boolean = false;
  sidebarStep1: boolean = true;
  sidebarStep2: boolean = false;
  showFloorPlate: boolean = true;
  sidebarStep2List: Array<any> = [];
  sidebarStep3: boolean = false;
  apartmentTypes: any;
  totalApartments: any;
  clientId: any;
  jsonData = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpService,
    private socketService: SocketService,
    private iframeService: IframeService,
    private apartmentService: ApartmentService,
    private floorService: FloorplanService,
    private floorPlateSErvice: FloorplateService,
    private viewService: ViewsService,
    private sidebarListService: SidebarService

  ) {
    window.document.addEventListener("click_on_building", (e: any) => {
      document.getElementById('hidesidebar')?.classList.add('opened');
      let data = JSON.parse(e.detail);
      console.log(data)
      if (data) {
        this.id = 'intuifaceData';
        let requestData = [
          { field: 'field_7', operator: 'is', value: data.apartment.slice(-4) },]

        this.http
          .get(
            API_PATH.GET_BUILDING_DATA +
            `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`
          )
          .subscribe((res: any) => {
            console.log(res)
            console.log(res.records[0].field_286)
            let levelData = [{ field: 'field_286', operator: 'is', value: res.records[0].field_286 }];
            this.http
              .get(
                API_PATH.GET_BUILDING_DATA +
                `?filters=${JSON.stringify(levelData)}&rows_per_page=1000`
              )
              .subscribe((res: any) => {
                this.sidebarStep2List = [];
                this.sidebarStep2List = res?.records;
                this.sidebarListService.setSidebarList(res?.records);
              })
            this.displayCloseBtn = true;
            let apartmentDetails = res?.records;

            if (!apartmentDetails[0].field_36_raw) {
              this.lotPdfUrl = apartmentDetails[0].field_36_raw?.url;
              this.displayQR = false;
            }
            if (this.id === 'views') {
              this.viewService.sendFloorLevel(apartmentDetails[0]);
            }
            if (this.id === 'floorPlan') {
              this.floorService.sendImg(apartmentDetails[0].field_314);
              this.floorService.hideModal(true);
            }
            this.floorDetails = apartmentDetails[0];
            this.socketService.emitSocket({
              data: { records: apartmentDetails, type: e.type },
            });

            this.sidebarStep1 = false;
            this.sidebarStep2 = false;
            this.sidebarStep3 = true;
          })
      }

    })
    this.sidebarListService.getSidebarList3().subscribe((res) => {
      this.floorDetails = res[0];
      this.sidebarStep3 = true;
      this.sidebarStep2 = false;
      this.sidebarStep1 = false;
    })
    this.viewService.getModal().subscribe((res) => {
      if (res) {
        this.selectedID = '';
        this.sidebarStep2List;
        this.sidebarStep3 = false;
        this.sidebarStep2 = true;
        this.sidebarStep1 = false;
      }
    });
    this.floorService.getFloorType().subscribe((res) => {

      this.floorLevel = [];
      this.selectedLevel = [];
      this.bedroomSet = [];
      this.getLevel();
      let requestData = [{ field: 'field_235', operator: 'is', value: res }];
      this.http
        .get(
          API_PATH.GET_BUILDING_DATA +
          `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`
        )
        .subscribe((res: any) => {

          this.totalApartments = res?.total_records;
          this.sidebarStep2List = res?.records;

          this.sidebarStep1 = false;
          this.sidebarStep2 = true;
          if (this.checkFloorPlan) {
            let floorPlanID = [];
            let displayFloorplan = [];

            floorPlanID = this.sidebarStep2List.map((x) => x.field_435_raw);
            displayFloorplan = floorPlanID.map((x) => ({
              value: x[0].identifier,
            }));
            this.sidebarListService.setSidebarList(this.sidebarStep2List);
            this.floorService.setSliderData(displayFloorplan);
          }

        }
        )
    });
    this.floorService.getSidebar().subscribe((res) => {
      if (res) {
        document.getElementById('hidesidebar')?.classList.add('opened');
      }
    });
  }

  ngOnInit(): void {
    window.onresize = (e) => {
      this.iframeService.emitEvent('jsonData', { data: this.jsonData });
    }
    this.http.get(API_PATH.GET_FLOOR_PLAN).subscribe((res: any) => {
      this.apartmentTypes = res?.records.map((x: any) => ({
        value: x.field_330,
        src: x.field_333_raw.url,
      }));
    });
    this.getLevel();
    this.resetLevel();
    document.getElementById('aside')?.classList.add('amenity-sidebar');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.pathColor = [false];
        this.aerialPathColor = [true, true, true, true, true, true];
        this.checkFloorPlan = false;
        this.iframeService.emitEvent('reset', { reset: true });
        let e: any = document.getElementById('myDropdown');
        if (e) {
          e.value = 'Select Apartment Types';
        }
        this.selectedID = '';
        this.sidebarStep2List = [];
        this.totalApartments = '';
        this.sidebarStep1 = true;
        this.sidebarStep2 = false;
        this.sidebarStep3 = false;
        this.floorLevel = [];
        this.bedroomSet = [];

        var data = event.url.substring(1);
        this.masterSelected = false;
        this.masterAllSelected = false;
        if (data) {
          if (data === 'apartments/floorplan') {
            this.title = 'Floor Plans';
            this.showFloorPlate = true;
            this.id = 'floorPlan';
            this.checkFloorPlan = true;
          } else if (data === 'apartments/views') {
            document.getElementById('hidesidebar')?.classList.add('opened');
            this.showFloorPlate = false;
            this.title = 'Views';
            this.id = 'views';
          } else if (data === 'apartments/floor-plate') {
            document.getElementById('hidesidebar')?.classList.add('opened');
            this.showFloorPlate = false;
            this.title = 'Floor Plates';
            this.id = 'floorPlate';
          } else {
            this.id = 'modal';
            this.title = 'Apartment Selector';
            this.showFloorPlate = true;
          }

          if (
            data.includes('location') ||
            data.includes('masterplan/aerial') ||
            data === 'masterplan'
          ) {
            document.getElementById('hidesidebar')?.classList.add('opened');
            this.showMenu = true;
            this.locationMenu = true;
            if (data.includes('masterplan/aerial') || data === 'masterplan') {
              this.showMasterPlanMenu = true;
              this.id = 'masterplanID';
              document
                .getElementById('locationMenu')
                ?.classList.add('master-menu');
              this.sideMenu = this.masterPlanMenu;
            } else {
              this.showMasterPlanMenu = false;
              this.id = 'locationID';
              document
                .getElementById('locationMenu')
                ?.classList.remove('master-menu');
              this.sideMenu = LOCATION.SIDE_MENU;
            }

            this.apartmentSidebar = false;
            setTimeout(() => {
              document
                .getElementById('aside')
                ?.classList.remove('amenity-sidebar');
            }, 0);
          }

          else if (
            data === 'apartments' ||
            data === 'apartments/floorplan' ||
            data === 'apartments/model'
          ) {
            if (
              document
                .getElementById('hidesidebar')
                ?.classList.contains('opened')
            ) {
              document
                .getElementById('hidesidebar')
                ?.classList.remove('opened');
            }

            document
              .getElementById('aside')
              ?.classList.remove('amenity-sidebar');
            this.showMenu = false;
            this.locationMenu = false;
            this.apartmentSidebar = true;
          } else if (
            data === 'apartments/floor-plate' ||
            data === 'apartments/views'
          ) {
            document
              .getElementById('hidesidebar')
              ?.classList.contains('opened');
            this.apartmentSidebar = true;
          } else {
            this.showMenu = false;
            this.apartmentSidebar = false;
            document.getElementById('hidesidebar')?.classList.remove('opened');
          }
        } else {
          this.showMenu = false;
          this.apartmentSidebar = false;
          document.getElementById('hidesidebar')?.classList.remove('opened');
        }
        this.getLevel();
      });
  }

  myFunction(id: any) {
    if (id == 'hidesidebar') {
      let element = document.getElementById('hidesidebar');
      element?.classList.toggle('opened');
    }
  }
  async ngOnDestroy() {
    let element = document.getElementById('hidesidebar');
    element?.classList.toggle('opened');
  }

  getLevel() {
    for (let i = 1; i <= 25; i++) {
      if (this.id === 'views') {
        this.floorLevel.push({
          name: 'L' + `${i}`,
          id: 'level_' + `${i}`,
          isSelected: false,
          level: `${i}`,
          isDisabled: i === 1 ? true : false,
        });
      } else {
        this.floorLevel.push({
          name: 'L' + `${i}`,
          id: 'level_' + `${i}`,
          isSelected: false,
          level: `${i}`,
          isDisabled: false,
        });
      }
      if (i <= 4) {
        if (i === 1 || i === 2) {
          this.bedroomSet.push({
            id: 'bed_' + `${i}`,
            name: 'available',
            isSelected: false,
            selectBed: i,
          });
        } else if (i === 3) {
          this.bedroomSet.push({
            id: 'bed_' + `${i}`,
            name: 'sold',
            isSelected: false,
            selectBed: i,
          });
        } else {
          this.bedroomSet.push({
            id: 'bed_' + `${i}`,
            name: 'Reserved',
            isSelected: false,
            selectBed: i,
          });
        }
        this.allBedroomSet = this.bedroomSet;
      }
    }
  }

  onselectApartmentType(e: any) {
    this.apartmentType = [];
    this.apartmentType.push({
      field: 'field_235',
      operator: 'is',
      value: e.value,
    });
  }

  isAllBedSelect() {
    this.masterAllSelected = false;
    this.masterSelected = this.bedroomSet.every(function (item: any) {
      return item.isSelected == false;
    });
    this.getSavedList();
  }

  getSavedList() {
    this.selectedBed = [];
    for (var i = 0; i < this.bedroomSet.length; i++) {
      if (!this.bedroomSet[i].isSelected)
        this.selectedBed.push({
          field: 'field_15',
          operator: 'is not',
          value: this.bedroomSet[i].selectBed.toString(),
        });
    }
  }

  checkUncheckAllBed(e: any) {
    this.selectedBed = [];
    this.bedroomSet = this.bedroomSet.map((x) => ({
      ...x,
      isSelected: false,
    }));
    this.masterSelected = false;
  }

  getCheckedItemList() {
    let selected = [];
    this.selectedBed = [];
    this.selectedBed = [
      { field: 'field_15', operator: 'is not', value: '200' },
    ];

    for (var i = 0; i < this.allBedroomSet.length; i++) {
      if (!this.allBedroomSet[i].isSelected)
        selected.push({
          field: 'field_15',
          operator: 'is not',
          value: this.allBedroomSet[i].selectBed.toString(),
        });
    }
  }

  chooseFloor(index: any) {
    this.selectedLevel = [
      { field: 'field_286', operator: 'is not', value: '200' },
    ];
    if (!this.showFloorPlate) {
      this.floorLevel = this.floorLevel.map((x, i) => ({
        ...x,
        isSelected: index === i ? true : false,
      }));

      for (var i = 0; i < this.floorLevel.length; i++) {
        if (!this.floorLevel[i].isSelected)
          this.selectedLevel.push({
            field: 'field_286',
            operator: 'is not',
            value: this.floorLevel[i].level,
          });
      }
      this.searchLevel();

      if (this.id === 'floorPlate') {
        this.http.get(API_PATH.GET_BUILDING_LEVEL).subscribe((res: any) => {
          let data = res?.records.reverse();
          // this.floorPlateSErvice.sendFloorPlateImg(data[index].field_329);
          this.floorPlateSErvice.sendFloorPlateImg({ image: data[index].field_329, floorPlate: true });
        });
      } else if (this.id === 'views') {
        this.viewService.sendFloorLevel(index + 1);
      }
    } else {
      this.floorSelected = this.floorLevel.every(function (item: any) {
        return item.isSelected == false;
      });

      for (var i = 0; i < this.floorLevel.length; i++) {
        if (!this.floorLevel[i].isSelected)
          this.selectedLevel.push({
            field: 'field_286',
            operator: 'is not',
            value: this.floorLevel[i].level,
          });
      }
    }
  }

  searchLevel() {
    if (
      this.apartmentType.length === 0 &&
      this.selectedBed.length === 0 &&
      this.selectedLevel.length === 0 &&
      this.masterAllSelected === false
    ) {
      this.toastr.warning('Please choose any filter');
      return;
    } else {
      let requestData = [];
      requestData = [
        { field: 'field_9', operator: 'is not', value: 'Cheese' },
        { field: 'field_286', operator: 'is not', value: '200' },
        { field: 'field_9', operator: 'is not', value: 'Sold' },
        { field: 'field_9', operator: 'is not', value: 'Reserved' },
        { field: 'field_15', operator: 'is not', value: '200' },
      ];
      if (this.apartmentType.length > 0) {
        requestData.push(...this.apartmentType);
      }
      if (this.selectedBed.length > 0) {
        requestData.push(...this.selectedBed);
      }
      if (this.selectedLevel.length > 0) {
        requestData.push(...this.selectedLevel);
      }

      this.http
        .get(
          API_PATH.GET_BUILDING_DATA +
          `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`
        )
        .subscribe((res: any) => {
          this.totalApartments = res?.total_records;
          this.sidebarStep2List = res?.records;
          this.sidebarListService.setSidebarList(this.sidebarStep2List);
          this.sidebarStep1 = false;
          this.sidebarStep2 = true;
          if (this.checkFloorPlan) {
            let floorPlanID = [];
            let displayFloorplan = [];

            floorPlanID = this.sidebarStep2List.map((x) => x.field_435_raw);
            displayFloorplan = floorPlanID.map((x) => ({
              value: x[0].identifier,
            }));

            this.floorService.setSliderData(displayFloorplan);
          } else {
            this.socketService.emitSocket({
              data: { records: this.sidebarStep2List, type: 'click' },
            });
            this.iframeService.emitEvent('data', {
              data: { records: this.sidebarStep2List },
            });
          }
        });
    }
  }

  resetLevel() {
    let e: any = document.getElementById('myDropdown');
    if (e) {
      e.value = 'Select Apartment Types';
    }
    this.selectedID = '';
    this.apartmentType = [];
    this.selectedBed = [];
    this.selectedLevel = [];
    this.sidebarStep2List = [];
    if (this.id === 'floorPlan') {
      this.floorService.setSliderData('fullSlide');
      this.floorService.hideModal(false);
    }
    this.masterAllSelected = false;
    this.masterSelected = false;
    this.bedroomSet = this.bedroomSet.map((x) => ({
      ...x,
      isSelected: false,
    }));
    this.floorLevel = this.floorLevel.map((x) => ({
      ...x,
      isSelected: false,
    }));
    // this.floorService.sendFloorType('fullSlide')
  }

  checkAvailability(id: any, e: any) {
    this.displayCloseBtn = true;
    this.iframeService.emitEvent('reset', { reset: true });
    let apartmentDetails = this.sidebarStep2List.filter(
      (x: any) => x.id === id
    );
    if (!apartmentDetails[0].field_36_raw) {
      this.lotPdfUrl = apartmentDetails[0].field_36_raw?.url;
      this.displayQR = false;
    }
    if (this.id === 'views') {
      this.viewService.sendFloorLevel(apartmentDetails[0]);
    }
    if (this.id === 'floorPlan') {
      this.floorService.sendImg(apartmentDetails[0].field_314);
      this.floorService.hideModal(true);
    }
    this.floorDetails = apartmentDetails[0];
    this.socketService.emitSocket({
      data: { records: apartmentDetails, type: e.type },
    });
    this.iframeService.emitEvent('data', {
      data: { records: apartmentDetails },
    });

    this.sidebarStep1 = false;
    this.sidebarStep2 = false;
    this.sidebarStep3 = true;
  }

  resetStep2() {
    this.iframeService.emitEvent('reset', { reset: true });
    this.resetLevel();

    if (this.id === 'floorPlan') {
      this.sidebarStep2 = false;
      this.sidebarStep1 = true;
      this.sidebarStep3 = false;
      this.floorService.setSliderData('fullSlide');
    } else if (this.id === 'floorPlate') {
      this.floorPlateSErvice.sendFloorPlateImg('');
    } else if (this.id === 'views') {
      this.viewService.hideModal(false);
    }
    this.sidebarStep2 = false;
    this.sidebarStep1 = true;
    this.sidebarStep3 = false;
  }
  resetStepbar3() {

    this.resetStep3();


  }
  resetStep3() {
    this.displayCloseBtn = false;
    if (this.id === 'floorPlan') {
      this.resetLevel();
      this.sidebarStep1 = true;
      this.sidebarStep2 = false;
      this.sidebarStep3 = false;
    } else if (this.id === 'floorPlate') {
      this.resetLevel();
      this.sidebarStep1 = true;
      this.sidebarStep2 = false;
      this.sidebarStep3 = false;
      this.floorPlateSErvice.sendFloorPlateImg('');
    } else if (this.id === 'views') {
      this.resetLevel();
      this.sidebarStep1 = true;
      this.sidebarStep2 = false;
      this.sidebarStep3 = false;
      this.viewService.hideModal(false);

    }
    else if (this.id === "intuifaceData") {
      this.sidebarStep1 = true;
      this.sidebarStep2 = false;
      this.sidebarStep3 = false;
      this.apartmentService.sendImg('');
      this.iframeService.emitEvent('reset', { reset: true });
      this.id = 'modal';
      this.selectedID = '';
      this.resetLevel();
    } else {
      if (this.selectedID) {

        setTimeout(() => {
          this.iframeService.emitEvent('reset', { reset: true });
          this.socketService.emitSocket({
            data: { records: this.sidebarStep2List, type: 'click' },
          });
          this.iframeService.emitEvent('data', {
            data: { records: this.sidebarStep2List },
          });
        }, 3000);
      }
      this.apartmentService.sendImg('');
      this.sidebarStep2List;
      this.iframeService.emitEvent('reset', { reset: true });
      this.socketService.emitSocket({
        data: { records: this.sidebarStep2List, type: 'click' },
      });
      this.iframeService.emitEvent('data', {
        data: { records: this.sidebarStep2List },
      });
      this.selectedID = '';
      this.sidebarStep2 = true;
      this.sidebarStep1 = false;
      this.sidebarStep3 = false;
    }
  }

  viewFloorplan(imgPath: any) {
    this.selectedID = 'floorPlan';
    if (this.id === 'floorPlan') {
      this.floorService.hideModal(true);
      this.floorService.sendImg(imgPath);
    } else if (this.id === 'floorPlate') {
      this.floorPlateSErvice.sendFloorPlateImg(imgPath);
    } else if (this.id === 'modal' || this.id === "intuifaceData") {
      this.apartmentService.sendImg(imgPath);
    } else if (this.id === 'views') {
      this.viewService.sendViewImg(imgPath);
    }
  }

  viewFloorplate(level: any) {
    let plateImg;
    this.sidebarListService.setSidebarList(this.sidebarStep2List);
    this.http.get(API_PATH.GET_BUILDING_LEVEL).subscribe((res: any) => {

      let data = res?.records.filter((x: any) => x.field_328 === level);
      plateImg = data[0].field_329;
      this.selectedID = 'floorPlate';
      if (this.id === 'floorPlan') {
        this.floorService.hideModal(true);
        this.floorService.sendImg({ image: plateImg, floorPlate: true });
      } else if (this.id === 'floorPlate') {

        this.floorPlateSErvice.sendFloorPlateImg({ image: plateImg, floorPlate: true });
      } else if (this.id === 'modal' || this.id === "intuifaceData") {
        this.apartmentService.sendImg({ image: plateImg, floorPlate: true });
      } else if (this.id === 'views') {
        this.viewService.sendViewImg({ image: plateImg, floorPlate: true });
      }
    });
  }

  viewFloor1(imgPath: any) {
    this.selectedID = 'view';
    if (this.id === 'floorPlan') {
      this.floorService.hideModal(true);
      this.floorService.sendImg(imgPath);
    } else if (this.id === 'floorPlate') {
      this.floorPlateSErvice.sendFloorPlateImg(imgPath);
    } else if (this.id === 'modal' || this.id === "intuifaceData") {
      this.apartmentService.sendImg(imgPath);
    } else if (this.id === 'views') {
      this.viewService.sendViewImg(imgPath);
    }
  }

  viewFloor2(imgPath: any) {
    this.selectedID = 'view2';
    if (this.id === 'floorPlan') {
      this.floorService.sendImg(imgPath);
    } else if (this.id === 'floorPlate') {
      this.floorPlateSErvice.sendFloorPlateImg(imgPath);
    } else if (this.id === 'modal' || this.id === "intuifaceData") {
      this.apartmentService.sendImg(imgPath);
    } else if (this.id === 'views') {
      this.viewService.sendViewImg(imgPath);
    }
  }

  // submit(data: any, value?: any, i?: any) {
  //   this.status = !this.status;
  //   this.aerialPathColor.forEach((x, index: number) => {
  //     if (index != i) {
  //       this.aerialPathColor[index] = true;
  //     }
  //   })
  //   if (this.id === 'masterplanID') {
  //     this.aerialPathColor.forEach((x, index: number) => {
  //       if (index != i) {
  //         this.aerialPathColor[index] = true;
  //       }
  //     })
  //     // this.masterPlanService.sendLocationID(data);
  //   }
  //   else if (this.id === 'locationID') {
  //     let requestData = [
  //       { field: 'field_414', operator: 'contains', value: value },
  //     ];
  //     this.http
  //       .get(
  //         API_PATH.GET_LOCATION +
  //         `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`
  //       )
  //       .subscribe((res: any) => {
  //         this.iframeService.emitEvent('jsonData', { data: res?.records });
  //         this.jsonData = res?.records;
  //       });
  //     // this.locationService.sendLocationID(value);
  //   }
  // }
}
