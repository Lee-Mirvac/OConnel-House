import { Component } from '@angular/core';
import { masterPlanPageConstants } from 'src/app/common/constant';

@Component({
  selector: 'app-master-plan',
  templateUrl: './master-plan.component.html',
  styleUrls: ['./master-plan.component.scss']
})
export class MasterPlanComponent {
imageUrl=masterPlanPageConstants?.imageUrl;
}
