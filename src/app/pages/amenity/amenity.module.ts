import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenityComponent } from './amenity.component';
import { RouterModule, Routes } from '@angular/router';
import { RooftopComponent } from './rooftop/rooftop.component';
import { GroundLevelComponent } from './ground-level/ground-level.component';
const routes: Routes = [
  {
    path: '', component: AmenityComponent, children: [
      {
        path: '', redirectTo: 'rooftop', pathMatch: 'full'
      },
      {
        path: 'rooftop', component: RooftopComponent
      },
      {
        path: 'ground_level_2', component: GroundLevelComponent
      },
    ],
  },

]



@NgModule({
  declarations: [
    AmenityComponent,
    RooftopComponent,
    GroundLevelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AmenityModule { }
