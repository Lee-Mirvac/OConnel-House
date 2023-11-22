import { Component, OnInit } from '@angular/core';
import { APIS, PAGINATION } from 'src/app/common/constants';
import { MainHttpService } from 'src/app/core/services/main-http.service';

@Component({
  selector: 'app-stock-allocation',
  templateUrl: './stock-allocation.component.html',
  styleUrls: ['./stock-allocation.component.scss']
})
export class StockAllocationComponent implements OnInit {
  stockAllocatonList: Array<any> = [];
  paginationData = { ...PAGINATION };
  displayTable: boolean = true;
  constructor(private http: MainHttpService,) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http
      .postData(APIS.ADMIN.GET_STOCK_LIST, this.paginationData)
      .subscribe((res: any) => {

        // let decryptData = JSON.parse(this.EncrDecr.get(res?.data));
        let decryptData = res?.data;
        this.stockAllocatonList = decryptData.records;
        if (decryptData.total_records > 0) {
          this.displayTable = true;
        } else {
          this.displayTable = false;
        }
        //   this.total = decryptData.total_records;
      });
  }

}
