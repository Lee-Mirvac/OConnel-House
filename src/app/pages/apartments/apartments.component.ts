import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
})
export class ApartmentsComponent implements OnInit {
  flag: boolean = false;
  constructor(private route: Router) { }

  ngOnInit(): void {

    let currentUrl = this.route.url.substring(1);
    if (currentUrl.includes('apartments/model')) {
      this.flag = true;
    } else {
      this.flag = false;
    }
    this.route.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        var data = event.url.substring(1);
        if (data.includes('apartments/model')) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      });
  }
}
