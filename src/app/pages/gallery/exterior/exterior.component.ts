import { Component, ElementRef, OnInit } from '@angular/core';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import { API_PATH } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-exterior',
  templateUrl: './exterior.component.html',
  styleUrls: ['./exterior.component.scss']
})
export class ExteriorComponent implements OnInit {
  key = 'Amenity';

  ngOnInit() {

  }



}
