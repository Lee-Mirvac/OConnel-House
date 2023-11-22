import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentsComponent } from './apartments.component';
import { ModelThreeDComponent } from './model-three-d/model-three-d.component';
import { FloorPlanComponent } from './floor-plan/floor-plan.component';
import { FloorPlateComponent } from './floor-plate/floor-plate.component';
import { ViewsComponent } from './views/views.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { LightgalleryModule } from 'lightgallery/angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxLoadingModule } from 'ngx-loading';
import { SlickCarousalComponent } from './slick-carousal/slick-carousal.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsComponent,
    children: [
      {
        path: '',
        redirectTo: 'model',
        pathMatch: 'full',
      },
      {
        path: 'model',
        component: ModelThreeDComponent,
      },
      {
        path: 'floorplan',
        component: FloorPlanComponent,
      },
      {
        path: 'floor-plate',
        component: FloorPlateComponent,
      },
      {
        path: 'views',
        component: ViewsComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    ApartmentsComponent,
    ModelThreeDComponent,
    FloorPlanComponent,
    FloorPlateComponent,
    ViewsComponent,
    SlickCarousalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    LightgalleryModule,
    SlickCarouselModule,
    NgxLoadingModule,
  ],
  providers: [],
})
export class ApartmentsModule { }
