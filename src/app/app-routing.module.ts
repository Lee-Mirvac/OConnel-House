import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VideoComponent } from './pages/video/video.component';
import { MasterPlanComponent } from './pages/master-plan/master-plan.component';
import { LocationComponent } from './pages/location/location.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ROUTE_DEFINATION } from './common/constants';

const appRoutes=ROUTE_DEFINATION?.APP_ROUTING
const routes: Routes = [
  {
    path:appRoutes.MAIN,
    component:HomeComponent,
    pathMatch: 'full',
  },
  {
    path:appRoutes.HOME,
    component: HomeComponent,
  },
  {
    path:appRoutes.LOCATION,
    loadChildren: () =>
      import('./pages/location/location.module').then((x) => x.LocationModule),
  },
  {
    path:appRoutes.MASTERPLAN,
    loadChildren: () =>
      import('./pages/master-plan/master-plan.module').then(
        (x) => x.MasterPlanModule
      ),
  },
  {
    path: appRoutes.GALLERY,
    loadChildren: () =>
      import('./pages/gallery/gallery.module').then((x) => x.GalleryModule),
  },
  {
    path:appRoutes.AMENITY,
    loadChildren: () =>
      import('./pages/amenity/amenity.module').then((x) => x.AmenityModule),
  },
  {
    path:appRoutes.VIDEO,
    component:VideoComponent
  },
  {
    path:appRoutes.APARTMENTS,
    loadChildren: () =>
      import('./pages/apartments/apartments.module').then(
        (x) => x.ApartmentsModule
      ),
  },
  {
    path:'**',
    redirectTo:appRoutes.MAIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
