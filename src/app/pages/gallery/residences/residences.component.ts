import { Component, OnInit } from '@angular/core';
import { LightGallery } from 'lightgallery/lightgallery';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import { API_PATH } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.scss']
})
export class ResidencesComponent {
  key = 'Residence';

}
