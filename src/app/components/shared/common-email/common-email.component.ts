import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { REGEX, APIS } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { SweetService } from 'src/app/core/services/sweet.service';

@Component({
  selector: 'app-common-email',
  template: './common-email.component.html',
  // styleUrls: ['./common-email.component.scss']
})
export class CommonEmailComponent implements OnInit {
  sendEmailItems: Array<any> = [];
  attachments: Array<any> = [];
  pdfImg = 'assets/img/pdf1.png'
  addAgent!: any;
  submitted: boolean = false;
  showRecords: boolean = false;
  newArray: Array<any> = [];
  constructor(private fb:FormBuilder, private http: HttpService,
    private swal: SweetService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.calcImgSize();
    this.addAgent = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  get f() {
    return this.addAgent.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addAgent.invalid) {
      Object.keys(this.addAgent.controls).forEach((key) =>
        this.addAgent.controls[key].markAsTouched({ onlySelf: true })
      );
      return;
    }
    this.attachments = [];
    if (this.sendEmailItems.length > 0) {
      this.attachments = this.sendEmailItems.map((a: any) => a.img)
    }
    let data = this.addAgent.value;
    data['attachments'] = this.attachments;
    if (this.attachments.length === 0) {
      this.toastr.warning('Please select any Documents/attachments');
      return
    }
    this.http
      .postData(APIS.ADMIN.SEND_BROCHURE, this.addAgent.value)
      .subscribe((res: any) => {
        this.submitted = false;
        this.addAgent.reset();
        this.toastr.success(res?.msg);
        localStorage.removeItem('emailData');
        localStorage.removeItem('galleryItem');
        this.sendEmailItems = [];
        this.attachments = [];
        this.showRecords = false;
        this.commonService.emailData([])
      });
  }


  async deleteData(i: any) {
    let swal_data = await this.swal.deleteSwal();
    if (swal_data.value) {
      this.sendEmailItems = this.sendEmailItems.filter((v: any) => v.level != i);
      localStorage.removeItem('emailData');
      localStorage.removeItem('galleryItem');
      localStorage.setItem('emailData', JSON.stringify(this.sendEmailItems));
      if (this.sendEmailItems.length === 0) {
        this.commonService.emailData([])
      } else {
        this.commonService.emailData(this.sendEmailItems);
      }
      if (this.sendEmailItems.length > 0) {
        this.showRecords = true
      }
      else {
        this.showRecords = false;
      }
    }

  }

  async calcImgSize() {
    let getEmailData: any = localStorage.getItem('emailData');
    let galleyItems: any = localStorage.getItem('galleryItem');
    if (getEmailData) {
      getEmailData = JSON.parse(getEmailData);
      this.newArray = getEmailData;
    }

    //getEmailData = JSON.parse(getEmailData);
    // console.log(getEmailData, "getEmailData");
    // console.log(this.newArray)
    // for (let ele of getEmailData) {
    //   let sizeOfFile = await this.getFileSize(ele.img);
    //   this.newArray.push({ ...ele, size: sizeOfFile });
    // }
    // this.newArray = getEmailData;
    // this.newArray = this.newArray.map((x: any) => ({
    //   ...x,
    //   imgSrc: x.img.slice(-3) === 'pdf' ? this.pdfImg : x.img
    // })
    // )
    if (galleyItems) {
      galleyItems = JSON.parse(galleyItems);
      galleyItems = galleyItems.map((x: any) => ({
        ...x,
        // imgSrc: x.img.slice(-3) === 'pdf' ? this.pdfImg : x.img
      }))
      this.newArray = galleyItems
    }
    if (galleyItems?.length > 0 && getEmailData?.length > 0) {
      this.newArray = getEmailData.concat(galleyItems);
    }
    this.newArray = this.newArray.map((x: any) => ({
      ...x,
      imgSrc: x.img.slice(-3) === 'pdf' ? this.pdfImg : x.img
    })
    );
    // for (let ele of this.newArray) {
    //   let sizeOfFile = await this.getFileSize(ele.img);
    //   this.sendEmailItems.push({ ...ele, size: sizeOfFile });
    // }
    // this.spinner.hide();
    if (this.newArray) {
      this.sendEmailItems = [...new Map(this.newArray.map((item: any) => [item.level, item])).values()]
    }
    if (this.sendEmailItems.length > 0) {
      this.showRecords = true
    } else {
      this.showRecords = false;
    }
  }

  getFileSize(url: any) {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      var fileSize: any = '';
      var http = new XMLHttpRequest();
      http.open('GET', url, true);
      // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // http.setRequestHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
      // http.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,observe");
      http.responseType = "arraybuffer";
      http.onload = function () {
        if (this.readyState == this.DONE) {
          fileSize = (this.response.byteLength / 1000).toFixed(2) + ' ' + 'KB';
        }
        resolve(fileSize);
      };
      http.send(null);
    });
  }
}
