import { Component } from '@angular/core';
import { locationPageConstants } from 'src/app/common/constant';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
locationConstants=locationPageConstants;
}
