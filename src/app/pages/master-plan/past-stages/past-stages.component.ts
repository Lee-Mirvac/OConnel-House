import { Component, OnInit } from '@angular/core';
import { API_PATH } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-past-stages',
  templateUrl: './past-stages.component.html',
  styleUrls: ['./past-stages.component.scss'],
})
export class PastStagesComponent implements OnInit {
  pastStagesImg = 'assets/img/masterplan1.png';
  pastStagesImgmb = 'assets/img/masterplan_mb.png';
  imgSrc = 'assets/img/popup_isle.jpg';
  disclaimerText: any;
  fillColorEvent: any;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    let requestData = [{ field: "field_474", operator: "is", value: "Masterplan" }];
    this.http.get(API_PATH.GET_DISCLAIMER + `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`).subscribe((res: any) => {
      this.disclaimerText = res.records[0].field_477;

    })
    // let requestData = { filters: [{ field: "field_474", operator: "is", value: "Masterplan" }], object: 'object_27' };
    // this.http.postData(APIS.GET_KNACK_DATABASE, requestData).subscribe((res: any) => {
    //   this.disclaimerText = res.records[0].field_477;

    // })
    // let requestData = { field: "field_474", operator: "is", value: "Masterplan" };
    // this.http.get(API_PATH.GET_DISCLAIMER + `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`).subscribe((res: any) => {
    //   this.disclaimerText = res.records[0].field_477;

    // })
  }

  fillColor(item: any) {
    let htmlButtons = document.getElementsByClassName(item);
    const htmlButtonsArray: Array<any> = [{ ...htmlButtons }];
    let data = htmlButtonsArray;
    this.fillColorEvent = [];
    this.fillColorEvent = data;

    this.checkID(data[0][0].id)
    for (let i of Object.keys(data[0])) {
      //this.checkID(data[0][i].id)
      if (document.getElementById(data[0][i].id)?.classList.contains('fill_color')) {
        document.getElementById('disclaim')?.classList.remove('show');
        document.getElementById(data[0][i].id)?.classList.remove('fill_color')
      } else {
        document.getElementById('disclaim')?.classList.add('show');
        document.getElementById(data[0][i].id)?.classList.add('fill_color')
      }

    }

  }

  disclaimer() {
    for (let i of Object.keys(this.fillColorEvent[0])) {
      if (document.getElementById(this.fillColorEvent[0][i].id)?.classList.contains('fill_color')) {
        document.getElementById(this.fillColorEvent[0][i].id)?.classList.remove('fill_color');
        document.getElementById('disclaim')?.classList.remove('show');
      }

    }
  }

  checkID(data: any) {
    // this.imgSrc = '';
    switch (data) {
      case 'Path_64':
        this.imgSrc = 'assets/img/popup_liv.jpg'
        break;
      case 'Path_65':
        this.imgSrc = 'assets/img/popup_unison.jpg'
        break;
      case 'Path_68':
        this.imgSrc = 'assets/img/popup_pier.jpg'
        break;
      case 'Path_67':
        this.imgSrc = 'assets/img/popup_park.jpg'
        break;
      case 'Path_62':
        this.imgSrc = 'assets/img/popup_quay.jpg'
        break;
      case 'Path_60':
        this.imgSrc = 'assets/img/popup_isle.jpg'
        break;
      default:
        this.imgSrc = '';
        break;
    }

  }
}
