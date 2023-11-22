import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenityComponent } from './amenity.component';
import { RouterModule, Routes } from '@angular/router';
import { RooftopComponent } from './rooftop/rooftop.component';
import { GroundLevelComponent } from './ground-level/ground-level.component';
import { ROUTE_DEFINATION } from 'src/app/common/constants';

const amenityRoutes=ROUTE_DEFINATION.AMENITY_ROUTING;
const routes: Routes = [
  {
    path: '', component: AmenityComponent, children: [
      {
        path: '', redirectTo:amenityRoutes.ROOF_TOP, pathMatch: 'full'
      },
      {
        path: amenityRoutes.ROOF_TOP, component: RooftopComponent
      },
      {
        path: amenityRoutes.GROUND_LEVEL_2, component: GroundLevelComponent
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
