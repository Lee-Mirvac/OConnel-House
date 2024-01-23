import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { LightGallery } from 'lightgallery/lightgallery';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import { API_PATH, USER_CONSTANTS } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-common-gallery',
  templateUrl: './common-gallery.component.html',
  styleUrls: ['./common-gallery.component.scss']
})
export class CommonGalleryComponent implements OnInit {

  @Input() keys: any;
  private lightGallery!: LightGallery;
  private needRefresh = false;
  displayLightGallery: boolean = false;
  settings: any;
  slides: any = [];
  openSlides: any = [];
  roles = USER_CONSTANTS.USER_TYPES;
  role:any;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    speed: 1200,
    arrows: true,
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

  constructor(private http: HttpService, private _elementRef: ElementRef) { }

  ngOnInit(): void {
    let requestData = [{ field: 'field_445', operator: 'is', value: this.keys }];
    this.http.postData('',{filters:requestData,object:API_PATH.GET_GALLERY?.split('/')[1]}).subscribe((res: any) => {

      this.slides = res?.records.map((x: any, index: number) => ({
        id: index,
        src: x.field_453_raw.url,
        disclaimer: x.field_447,
        caption: x.field_449,
        mainSrc: x.field_450_raw.url
      }));
      this.slides = this.slides.sort(function (a: any, b: any) {
        return a.caption.localeCompare(b.caption);
      });
      if (this.slides.length > 0) {
        this.openSlides = res?.records.map((x: any, index: number) => ({
          id: index,
          src: x.field_450_raw.url,
          caption: x.field_449,
          subHtml: `<div class="lightGallery-captions">
            <h4>${x.field_449}</h4>
            <p>${x.field_447}</p>
        </div>`,
        }));
        this.openSlides = this.openSlides.sort(function (a: any, b: any) {
          return a.caption.localeCompare(b.caption);
        });
      }

    });
    if (this.openSlides.length > 0) {
      this.displayLightGallery = true;
    }
    this.openSlides = [...this.openSlides];

    this.settings = {
      counter: false,
      dynamic: true,
      dynamicEl: this.openSlides,
      container: this._elementRef.nativeElement as HTMLElement,
      thumbnail: false,
      appendAutoplayControlsTo: '.lg-toolbar',
      plugins: [lgAutoplay],
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: true,
      },
      download: false,
      mode: 'fade',
    };
  }

  slickInit(e: any) { }

  ngAfterViewChecked(): void {
    if (this.needRefresh) {

      this.lightGallery.refresh(this.openSlides);

      this.lightGallery.openGallery();
      this.needRefresh = false;
    }
  }

  onInit = (detail: any): void => {

    this.lightGallery = detail.instance;
  };

  addImage = () => {

    this.openSlides = [...this.openSlides];

    this.needRefresh = true;
  };

  // openGallery(data: any) {

  //   if (this.slides.length > 0) {
  //     this.openSlides = this.slides.map((x: any, index: number) => ({
  //       id: index,
  //       src: x.mainSrc,
  //       caption: x.caption,
  //       subHtml: `<div class="lightGallery-captions">
  //           <h4>${x.caption}</h4>
  //           <p>${x.disclaimer}</p>
  //       </div>`,
  //     }));

  //   } this.lightGallery.refresh(this.openSlides);

  //   this.lightGallery.openGallery(data);
  //   this.addImage();

  // }

  // // getData() {
  // // }
  openGallery(data: any) {
    if (this.role) {
      this.role = JSON.parse(this.role);
    }
    if (this.role === this.roles.AGENT || this.role === this.roles.SUPER_ADMIN) {
      if (this.slides.length > 0) {
        this.openSlides = this.slides.map((x: any, index: number) => ({
          id: index,
          src: x.mainSrc,
          caption: x.caption,
          subHtml: `<div class="lightGallery-captions">
            <h4>${x.caption}</h4> <p>${x.disclaimer}</p>
      <div class="glry_icn"> <img src="assets/img/icons/email-icon-whitwnew.svg"   onclick = "checkImage('${x.caption}','${x.mainSrc}')" /></div>
 </div>`,
        }));
      }
    } else {
      if (this.slides.length > 0) {
        this.openSlides = this.slides.map((x: any, index: number) => ({
          id: index,
          src: x.mainSrc,
          caption: x.caption,
          subHtml: `<div class="lightGallery-captions">
            <h4>${x.caption}</h4> <p>${x.disclaimer}</p> </div>`,
        }
        )
        );
      }
    }
    this.lightGallery.refresh(this.openSlides);
    this.lightGallery.openGallery(data);
    this.addImage();

  }
}
