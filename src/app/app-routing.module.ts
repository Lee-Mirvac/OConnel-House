import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './common/constant';
import { HomeComponent } from './components/shared/components/pages/home/home.component';
import { NavMenuComponent } from './components/shared/components/pages/nav-menu/nav-menu.component';
import { LocationComponent } from './components/shared/components/pages/location/location.component';
import { VideoComponent } from './components/shared/components/pages/video/video.component';
import { GalleryComponent } from './components/shared/components/pages/gallery/gallery.component';
import { AmenityComponent } from './components/shared/components/pages/amenity/amenity.component';
import { MasterPlanComponent } from './components/shared/components/pages/master-plan/master-plan.component';

const routes: Routes = [
  {component:HomeComponent,path:appRoutes?.home},
  {component:NavMenuComponent,path:appRoutes?.navMenu},
  {component:LocationComponent,path:appRoutes?.location},
  {component:VideoComponent,path:appRoutes?.video},
  {component:GalleryComponent,path:appRoutes?.gallery},
  {component:AmenityComponent,path:appRoutes?.amenity},
  {component:MasterPlanComponent,path:appRoutes?.masterPlan},
  {path:'**',pathMatch:'full',redirectTo:appRoutes?.home}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
