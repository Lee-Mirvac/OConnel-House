import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { VideoComponent } from './pages/video/video.component';
import { MasterPlanComponent } from './pages/master-plan/master-plan.component';
import { LocationComponent } from './pages/location/location.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component:MainPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'location',
    component:LocationComponent
  },
  {
    path: 'masterplan',
    component:MasterPlanComponent
  },
  {
    path: 'gallery',
    component:GalleryComponent
  },
  {
    path: 'amenity',
    loadChildren: () =>
      import('./pages/amenity/amenity.module').then((x) => x.AmenityModule),
  },
  {
    path: 'video',
    component:VideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
