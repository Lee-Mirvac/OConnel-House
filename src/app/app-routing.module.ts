import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { VideoComponent } from './pages/video/video.component';
import { MasterPlanComponent } from './pages/master-plan/master-plan.component';
import { LocationComponent } from './pages/location/location.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ROUTE_DEFINATION } from './common/constants';

const appRoutes=ROUTE_DEFINATION?.APP_ROUTING
const routes: Routes = [
  {
    path:appRoutes.MAIN,
    component:MainPageComponent,
    pathMatch: 'full',
  },
  {
    path:appRoutes.HOME,
    component: HomeComponent,
  },
  {
    path:appRoutes.LOCATION,
    component:LocationComponent
  },
  {
    path:appRoutes.MASTERPLAN,
    component:MasterPlanComponent
  },
  {
    path:appRoutes.GALLERY,
    component:GalleryComponent
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
