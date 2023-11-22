
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LOCATION } from 'src/app/common/constants';
import { LocationService } from 'src/app/core/services/location.service';
import { a } from 'src/assets/location/parkRiver'


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  status: boolean = true;
  sideMenuList: any;
  locationID: any;
  flag: boolean = false;
  imgSrc: any;
  videoUrl: any;
  locationSidebar: Array<any> = LOCATION.LOCATION_SIDEBAR;


  constructor(
    private locationService: LocationService,
  ) {
    this.locationService.getLocationID().subscribe((data: any) => {
      this.locationID = data;


      if (this.locationID === 'PARKS' || this.locationID === 'Transports') {
        let data = (this.locationID).toLowerCase()
        this.flag = true;
        this.videoUrl = 'assets/location/' + `${data}` + '.mp4'


      } else {
        this.flag = false
      }
    });
  }

  ngOnInit(): void {

  }


}
