import { Component } from '@angular/core';
import { AMENITY } from 'src/app/common/constants';
@Component({
  selector: 'app-ground-level',
  templateUrl: './ground-level.component.html',
  styleUrls: ['./ground-level.component.scss']
})
export class GroundLevelComponent  {
groundLevelImageUrl=AMENITY.GROUND_LEVEL;
}
