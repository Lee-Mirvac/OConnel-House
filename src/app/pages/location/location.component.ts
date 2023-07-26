import { Component, OnInit } from '@angular/core';
import { LOCATION } from 'src/app/common/constants';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent  {
  // Image Url For Location Page
  imageUrl=LOCATION.IMAGE_URL;
}
