import { Component} from '@angular/core';
import { VIDEO } from 'src/app/common/constants';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent{
  videoUrl=VIDEO.VIDEO_URL;
}
