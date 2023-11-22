import { Component, OnInit, Pipe } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-finishes-selector',
  templateUrl: './finishes-selector.component.html',
  styleUrls: ['./finishes-selector.component.scss'],
})
export class FinishesSelectorComponent implements OnInit {
  imgSrc = 'https://finishes.isle.mirvac.com';
  urlSafe!: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSrc);
  }


  navigate() {
    let data = <HTMLIFrameElement>document.getElementById("gfgFrame");
    if (data) {
      data.src = "https://www.geeksforgeeks.org/";
    }
  }
}
