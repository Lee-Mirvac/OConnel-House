import { Component, OnInit } from '@angular/core';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { LightGallery } from 'lightgallery/lightgallery';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  settings: any;
  private lightGallery!: LightGallery;

  constructor() {}

  ngOnInit(): void {
    this.settings = {
      counter: false,
    };
  }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
  };
}
