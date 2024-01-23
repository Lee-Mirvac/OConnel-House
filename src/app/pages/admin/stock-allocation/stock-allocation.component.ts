
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { APIS } from 'src/app/common/constants';
import { MainHttpService } from 'src/app/core/services/main-http.service';


@Component({
  selector: 'app-stock-allocation',
  templateUrl: './stock-allocation.component.html',
  styleUrls: ['./stock-allocation.component.scss']
})
export class StockAllocationComponent implements OnInit {
  stockAllocatonList: Array<any> = [];
  placeholderText = 'Select Agent'
  paginationData: any = {
    limit: 100,
    page: 1
  };
  @ViewChild(Table) dt!: Table;
  displayTable: boolean = true;
  restData: any;
  filterAgentList: any = [];
  filterLevel: any = [];
  apartmentText: any = '';
  selectedProducts: any = [];
  showModal: boolean = false;
  agentList: any = [];
  showText: any;
  id: any;
  total_records: any;
  stockCount: any;
  dropdownList: any = [];
  selectedItems: any = [];
  selectedFilterItems: Array<any> = [];
  newArray: any = []
  dropdownSettings: any = {};
  agentSettings: any = {};
  allFilterData: any = [];
  parseInt=Number.parseInt;

  constructor(private http: MainHttpService, private primengConfig: PrimeNGConfig, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
    this.primengConfig.ripple = true;
    this.dropdownSettings = {
      singleSelection: true,
      enableCheckAll:false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.agentSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false
    };
  }


  onSelectAll(items: any) {

  }

  getList(agentId?: any) {
    this.http
      .postData(APIS.AGENTS.GET_AGENT, { page: 1, limit: 1000 })
      .subscribe((res: any) => {
        this.agentList = res?.data.records;
        this.agentList = this.agentList.map((x: any) => ({
          ...x,
          firstName: x.firstName + ' ' + x.surName
        }))
        this.filterAgentList = res?.data.records;
        this.filterAgentList = this.filterAgentList.map((x: any) => ({
          ...x,
          firstName: x.firstName + ' ' + x.surName
        }))
        this.filterAgentList.unshift({ id: 'Mirvac', firstName: 'Mirvac' });
        this.agentList.unshift({ id: '', firstName: 'Mirvac' })
        let paginateData = {
          limit: 200,
          page: this.paginationData.page
        }
        this.paginationData.limit = 200;
        let agentID = agentId;
        if (agentId) {
          this.paginationData['agentId'] = agentID;
        }
        else {
          this.paginationData = paginateData;
        }
        this.http
          .getData(APIS.ADMIN.GET_LOTS_LIST, this.paginationData)
          .subscribe((res: any) => {
            let decryptData = res?.data;
            this.total_records = res?.data.total_records;
            this.stockAllocatonList = decryptData.records;
            let data: any = [];
            this.selectedItems = [];

            this.newArray = [];
            for (let i of this.stockAllocatonList) {
              for (let j = 0; j < this.agentList.length; j++) {
                if (i.agentId === this.agentList[j].id) {
                  data = [{ id: i.agentId, firstName: this.agentList[j].firstName }];
                  break;
                } else {
                  data = [{ id: '', firstName: 'Mirvac' }]
                }
              }
              this.newArray.push(data);
            }
            this.stockAllocatonList = this.stockAllocatonList.map((x: any) => ({
              ...x,
              company: x?.companyName ? x?.companyName?.identifier : 'Mirvac',
              apartmentLot: {
                level:parseInt(x.level.toString().split('.')[1],10)
              }
            }));


            if (this.allFilterData.length > 0) {
              this.selectedItems = this.allFilterData
            } else {
              this.selectedItems = this.newArray;
              this.restData = this.stockAllocatonList;
            }
            this.filterLevel = [];
            for (let i = 1; i <= 14; i++) {
              this.filterLevel.push({
                level: i
              })
            }

            if (decryptData.total_records > 0) {
              this.displayTable = true;
            } else {
              this.displayTable = false;
            }
            this.allFilterData = []
          });
      })
  }


  filterAgent(table: Table, item: any) {
    this.placeholderText = ''
    this.restData = this.restData.map((x: any) => ({
      ...x,
      agentId: item.id
    }))
    this.allFilterData = [];
    for (let j = 0; j < this.selectedItems.length; j++) {
      this.selectedItems[j][0].id = item.id;
      this.selectedItems[j][0].firstName = item.firstName
      this.allFilterData.push(this.selectedItems[j])
    }
    this.getList();
    this.selectedProducts = [];
  }

  deleteSelectedLots(id: any) {
    if (this.selectedProducts.length === 0) {
      this.toastr.warning('Please choose at least one apartment')
    }
    else {
      this.stockCount = this.selectedProducts.length;
      this.showModal = true;
      if (this.stockCount === 1) {
        this.apartmentText = 'apartment'
      } else {
        this.apartmentText = 'apartments'
      }
      this.id = id;
      this.checkId(id)
    }
  }

  cancelStockAllocation() {
    this.selectedProducts = [];
    this.showModal = false;
  }

  reStocks() {
    let data = {
      stockIds: this.selectedProducts.map(function (a: any) { return a.id })
    }
    let newArray: any = [];
    this.selectedProducts = this.restData.filter((x: any) => {
      this.selectedProducts.filter((y: any) => {
        if (x.id == y.id) {
          newArray.push(x)
        }
      })
    })
    this.allFilterData = []
    if (this.id === 'addStock') {

      let assignStock = newArray.map((x: any) => ({
        id: x.id,
        agentId: x.agentId
      }))
      this.http
        .postData(APIS.ADMIN.STOCK_LIST, { data: assignStock })
        .subscribe((res: any) => {
          this.showModal = false;
          this.getList();
        })
    }
    else {
      this.http
        .putData(APIS.ADMIN.STOCK_LIST, data)
        .subscribe((res: any) => {
          this.stockAllocatonList = this.stockAllocatonList.filter((val: any) => !this.selectedProducts.includes(val));
          this.getList();
        })
    }
    this.selectedProducts = [];
    this.showModal = false;
  }

  addSelectedLots(id: any) {
    if (this.selectedProducts.length === 0) {
      this.toastr.warning('Please first select apartments')
      //this.toastr.warning('Please choose at least one apartment')
    }
    else {
      this.stockCount = this.selectedProducts.length;
      this.showModal = true;
      if (this.stockCount === 1) {
        this.apartmentText = 'apartment'
      } else {
        this.apartmentText = 'apartments'
      }
      this.id = id;
      this.checkId(id)
    }
  }

  checkId(data: any) {
    switch (data) {
      case 'addStock':
        this.showText = 'assigning'
        break;
      case 'deleteStock':
        this.showText = 'releasing'
        break;
      default:
        this.showText = '';
        break;
    }
  }

  onItemSelect(item?: any, stockId?: any) {
    this.restData = this.restData.map((x: any) => ({
      ...x,
      agentId: x.id == stockId ? item.id : x.agentId
    }))
  }

  clearAgentFilter() {
    this.getList();
  }

  clear(table: Table) {
  }

  clearFilter() {
    this.placeholderText = 'Select Agent';
    this.getList()
  }

}