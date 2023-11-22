import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenthousesComponent } from './penthouses/penthouses.component';
import { PavillionsComponent } from './pavillions/pavillions.component';
import { ResidencesComponent } from './residences/residences.component';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { MainGalleryComponent } from './main-gallery/main-gallery.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ExteriorComponent } from './exterior/exterior.component';
import { SharedModule } from 'src/app/components/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    children: [
      {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full',
      },
      {
        path: 'all',
        component: MainGalleryComponent,
      },
      {
        path: 'exterior',
        component: ExteriorComponent,
      },

      {
        path: 'pavilions',
        component: PavillionsComponent,
      },
      {
        path: 'villas',
        component: PenthousesComponent,
      },
      {
        path: 'residences',
        component: ResidencesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PenthousesComponent,
    PavillionsComponent,
    ResidencesComponent,
    GalleryComponent,
    MainGalleryComponent,
    ExteriorComponent,
  ],
  imports: [
    CommonModule,
    LightgalleryModule,
    RouterModule.forChild(routes),
    SlickCarouselModule,
    SharedModule
  ],
})
export class GalleryModule { }
