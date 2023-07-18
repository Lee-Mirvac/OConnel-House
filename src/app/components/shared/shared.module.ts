import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavMenuComponent } from './components/pages/nav-menu/nav-menu.component';
import { VideoComponent } from './components/pages/video/video.component';
import { GalleryComponent } from './components/pages/gallery/gallery.component';
import { LocationComponent } from './components/pages/location/location.component';
import { AmenityComponent } from './components/pages/amenity/amenity.component';
import { MasterPlanComponent } from './components/pages/master-plan/master-plan.component';
import { CommonGalleryComponent } from './components/common-gallery/common-gallery.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NavMenuComponent,
    VideoComponent,
    GalleryComponent,
    LocationComponent,
    AmenityComponent,
    MasterPlanComponent,
    CommonGalleryComponent,
  ],
  imports: [
    SlickCarouselModule,
    CommonModule,
  ],
  exports:[
    HeaderComponent,
  ]
})
export class SharedModule { }
