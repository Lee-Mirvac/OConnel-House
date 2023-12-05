import { Component, Input, OnInit } from '@angular/core';
import { USER_CONSTANTS } from 'src/app/common/constants';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-common-masterplan',
  templateUrl: './common-masterplan.component.html',
  styleUrls: ['./common-masterplan.component.scss']
})
export class CommonMasterplanComponent implements OnInit {
  status: boolean = true;
  @Input() src: any;
  @Input() name: any;
  getData: any = [];
  role: any;
  roles = USER_CONSTANTS.USER_TYPES;
  emailIcon = 'assets/img/icons/email-icon.svg'
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role) {
      this.role = JSON.parse(this.role);
    }
  }


  storeData(img: any) {
    let imgSrc = 'https://isleapartments.releaseplan.habitatdigital.com.au/' + img;
    let getEmailData: any = localStorage.getItem('emailData');

    if (getEmailData) {
      this.getData = JSON.parse(getEmailData);
      this.getData.push({ level: this.name, img: imgSrc })
    } else {
      this.getData.push({ level: this.name, img: imgSrc })

    }
    localStorage.setItem('emailData', JSON.stringify(this.getData));
    this.commonService.emailData(this.getData)
  }
}
