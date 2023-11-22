import { Component } from '@angular/core';
import { AMENITY} from 'src/app/common/constants';
@Component({
  selector: 'app-rooftop',
  templateUrl: './rooftop.component.html',
  styleUrls: ['./rooftop.component.scss'],
})
export class RooftopComponent  {
  status: boolean = true;
  rooftopImg = AMENITY.ROOF_TOP_IMAGE_URL;
  rooftopImgmb: any;
 
}
