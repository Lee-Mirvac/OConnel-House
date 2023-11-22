import { Component, OnInit } from '@angular/core';
import { MIRVAC } from 'src/app/common/constants';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {
 award_list:any= MIRVAC.AWARD_LIST;
  constructor() { }

  ngOnInit(): void {
  }

}
