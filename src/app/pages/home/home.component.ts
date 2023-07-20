import { Component} from '@angular/core';
import { HOME } from 'src/app/common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  glb = 'assets/modal/main-model.glb'
  imageUrl=HOME.imageUrl;
  overlayText=HOME.overlayText;
  constructor() { }
}
