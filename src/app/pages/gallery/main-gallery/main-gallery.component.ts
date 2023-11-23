import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LightGallery } from 'lightgallery/lightgallery';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import { API_PATH } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-main-gallery',
  templateUrl: './main-gallery.component.html',
  styleUrls: ['./main-gallery.component.scss'],
})
export class MainGalleryComponent {
  key = "Amenity"
}