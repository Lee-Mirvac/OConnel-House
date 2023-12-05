import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApartmentService } from './core/services/apartment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "O'CONNELL";
  modalUrl = 'assets/modal/index.html';
  flag: boolean = false;
  isLoading: boolean = true;
  displayModal: boolean = false;
  modalClassChange: boolean = false;
  displayHeader: boolean = true;
  showBtn: boolean = false;
  showHeaderToggle=true;
  addCssToHamburger=false;
  constructor(private router: Router, private apartmentService: ApartmentService,) {
    this.apartmentService.getFloarPlainImage().subscribe((res) => {
      if (typeof res === 'object') { 
        document.getElementById('step3')?.classList.add('main-sec-step3-view');
        document.getElementById('active')?.classList.add('active');
        this.modalClassChange = false;
      }
      else if (res) {
        this.modalClassChange = false;
      }
      else {
        this.modalClassChange = true
      }
    });

  }
  ngOnInit() {
    document.getElementById("hemp")?.classList.contains('active')
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        if (event.url === '/') {
          this.showHeaderToggle=false
          this.modalClassChange = false;
        }
        else{
          this.showHeaderToggle=true
        }
        var data = (event.url).substring(1);

        if (data) {
          if (data.includes('location') && !data.includes('stock-allocation') ) {
            this.addCssToHamburger=true
            this.displayHeader = false;
            this.showBtn = true;
            this.modalClassChange = false;
          }
          else if (data.includes('apartments/model') || data === 'apartments') {
            this.displayModal = true;
            this.modalClassChange = true;
            this.showBtn = false;
            this.displayHeader = true;

          }
          else if (data.includes('home') ) {
            this.showBtn = false;
            this.displayHeader = false;
            this.modalClassChange = false;

          }
          else {
            this.showBtn = false;
            this.displayHeader = true;
            this.modalClassChange = false;
          }

        }

      })
  }


  checkLoading() {
    this.isLoading = false;
  }
  toggelHeader() {
    this.displayHeader = !this.displayHeader;
    this.addCssToHamburger =!this.addCssToHamburger
    if (document.getElementById("hemp")?.classList.contains('active')) {
      document.getElementById("hemp")?.classList.remove('active')
    } else {
      document.getElementById("hemp")?.classList.add('active')
    }
  }


}