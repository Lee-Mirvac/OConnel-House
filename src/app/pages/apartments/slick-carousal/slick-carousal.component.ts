import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FloorplanService } from 'src/app/core/services/floorplan.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-slick-carousal',
  templateUrl: './slick-carousal.component.html',
  styleUrls: ['./slick-carousal.component.scss']
})
export class SlickCarousalComponent implements OnInit {
  @Input() slides: any;

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
  constructor(private router: Router, private floorService: FloorplanService, private http: HttpService, private floorplanService: FloorplanService) { }

  ngOnInit(): void {
  }

  getDetails(data: any) {

    let modalSrc = `<img src=${data.src}>`;
    this.floorplanService.sendSlickData(modalSrc)

    //this.router.navigateByUrl(PAGE_ROUTES.FLOORPLAN + `/${id}`);
  }

}
