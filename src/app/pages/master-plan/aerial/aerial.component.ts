import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { API_PATH, MASTERPLAN } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { MasterplanService } from 'src/app/core/services/masterplan.service';

@Component({
  selector: 'app-aerial',
  templateUrl: './aerial.component.html',
  styleUrls: ['./aerial.component.scss'],
})
export class AerialComponent implements OnInit {
  status: boolean = true;
  aerialSidebar: Array<any> = MASTERPLAN.MASTERPLAN_SIDEBAR;
  subscription: Subscription;
  disclaimerText: any;

  constructor(private masteplanService: MasterplanService, private http: HttpService) {

    this.subscription = this.masteplanService.getLocationID().subscribe((data: any) => {


      this.aerialSidebar.forEach((x) => {
        document.getElementById(x.id)?.classList.remove('initial_show');
      });
      if (document.getElementById(data)?.classList.contains('show')) {

        document.getElementById(data)?.classList.remove('show');
      } else {

        document.getElementById(data)?.classList.add('show');
        this.aerialSidebar.forEach((x) => {
          if (x.id != data) {
            document.getElementById(x.id)?.classList.remove('show');
          }

        });
      }

    });
  }

  ngOnInit(): void {
    this.aerialSidebar.forEach((x) => {
      document.getElementById(x.id)?.classList.add('initial_show');
    });
    let requestData = [{ field: "field_474", operator: "is", value: "Aerial Image" }];
    this.http.get(API_PATH.GET_DISCLAIMER + `?filters=${JSON.stringify(requestData)}&rows_per_page=1000`).subscribe((res: any) => {
      this.disclaimerText = res.records[0].field_477;

    })
    setTimeout(() => {
      this.aerialSidebar.forEach((x) => {
        this.submit(x?.id);
      });
    }, 50);
  }

  submit(data: any) {
    this.status = !this.status;
    if (data) {
      if (document.getElementById(data)?.classList.contains('initial_show')) {
        document.getElementById(data)?.classList.remove('initial_show');
      } else {
        document.getElementById(data)?.classList.add('initial_show');
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
