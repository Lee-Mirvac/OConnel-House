import { Component, OnInit } from '@angular/core';
import { MASTERPLAN } from 'src/app/common/constants';

@Component({
  selector: 'app-master-plan',
  templateUrl: './master-plan.component.html',
  styleUrls: ['./master-plan.component.scss']
})
export class MasterPlanComponent implements OnInit {
  imageUrl=MASTERPLAN.imageUrl
  constructor() { }

  ngOnInit(): void {
  }

}
