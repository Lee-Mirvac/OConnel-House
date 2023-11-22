import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterPlanComponent } from './master-plan.component';
import { AerialComponent } from './aerial/aerial.component';
import { PastStagesComponent } from './past-stages/past-stages.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MasterPlanComponent,
    children: [
      {
        path: '',
        component:MasterPlanComponent,
        // redirectTo: 'aerial',
        pathMatch: 'full',
      },
      // {
      //   path: 'masterplan',
      //   component: PastStagesComponent,
      // },
      // {
      //   path: 'aerial',
      //   component: AerialComponent,
      // },
    ],
  },
];

@NgModule({
  declarations: [
    MasterPlanComponent,
    PastStagesComponent,
    AerialComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class MasterPlanModule { }
