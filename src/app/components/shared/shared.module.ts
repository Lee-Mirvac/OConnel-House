import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { SafePipe } from './directives/safe-pipe.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CommonGalleryComponent } from './common-gallery/common-gallery.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GalleryComponent } from 'src/app/pages/gallery/gallery.component';
import { MainPageComponent } from 'src/app/pages/main-page/main-page.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MasterPlanComponent } from 'src/app/pages/master-plan/master-plan.component';
import { VideoComponent } from 'src/app/pages/video/video.component';
const route: Routes = [];

@NgModule({
  declarations: [ HeaderComponent, 
                  SidebarComponent, 
                  SpinnerComponent, 
                  SafePipe, 
                  CommonGalleryComponent, 
                  GalleryComponent,
                  MainPageComponent,
                  HomeComponent,
                  MasterPlanComponent,
                  VideoComponent
                ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    NgxSpinnerModule,
    NgxQRCodeModule,
    LightgalleryModule,
    SlickCarouselModule
  ],
  exports: [HeaderComponent, SidebarComponent, SpinnerComponent, SafePipe, CommonGalleryComponent],
})
export class SharedModule { }
