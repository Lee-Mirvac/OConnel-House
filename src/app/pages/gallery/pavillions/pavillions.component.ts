import { Component, OnInit } from '@angular/core';
import { LightGallery } from 'lightgallery/lightgallery';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import { API_PATH } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-pavillions',
  templateUrl: './pavillions.component.html',
  styleUrls: ['./pavillions.component.scss'],
})
export class PavillionsComponent {
  key = "Pavilion"

}
