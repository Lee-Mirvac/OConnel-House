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
import { VideoComponent } from 'src/app/pages/video/video.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { CommonEmailComponent } from './common-email/common-email.component';

const route: Routes = [];

@NgModule({
  declarations: [
    HomeComponent,
    VideoComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent, 
    SafePipe, 
    CommonGalleryComponent,
    CommonEmailComponent],
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
  exports: [HeaderComponent, SidebarComponent, SpinnerComponent, SafePipe, CommonGalleryComponent,CommonEmailComponent],
})
export class SharedModule { }
