import { Component } from '@angular/core';

@Component({
  selector: 'app-common-gallery',
  templateUrl: './common-gallery.component.html',
  styleUrls: ['./common-gallery.component.scss']
})
export class CommonGalleryComponent { 
slides = [
  { img: 'https://via.placeholder.com/600.png/09f/fff' },
  { img: 'https://via.placeholder.com/600.png/021/fff' },
  { img: 'https://via.placeholder.com/600.png/321/fff' },
  { img: 'https://via.placeholder.com/600.png/422/fff' },
  { img: 'https://via.placeholder.com/600.png/654/fff' },
];
slideConfig = { slidesToShow: 3, slidesToScroll: 1 };
addSlide() {
  this.slides.push({ img: 'http://placehold.it/350x150/777777' });
}
removeSlide() {
  this.slides.length = this.slides.length - 1;
}
slickInit(e: any) {
  console.log('slick initialized');
}
breakpoint(e: any) {
  console.log('breakpoint');
}
afterChange(e: any) {
  console.log('afterChange');
}
beforeChange(e: any) {
  console.log('beforeChange');
}}
