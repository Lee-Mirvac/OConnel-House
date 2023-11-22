import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIS, PAGE_ROUTES, PAGINATION, REGEX, USER_CONSTANTS } from 'src/app/common/constants';
import { HttpService } from 'src/app/core/services/http.service';
import { MainHttpService } from 'src/app/core/services/main-http.service';

@Component({
  selector: 'app-agent-management',
  templateUrl: './agent-management.component.html',
  styleUrls: ['./agent-management.component.scss']
})
export class AgentManagementComponent implements OnInit {
  showModal: boolean = false;
  public maxSize: number = 3;
  selectedId: any;
  disable: boolean = false;
  agentList: any;
  agentID: any;
  addAgent!: FormGroup;
  editForm!: FormGroup;
  paginationData = { ...PAGINATION };
  editMode: boolean = false;
  submitted: boolean = false;
  displayTable: boolean = true;
  total: any;
  p = PAGINATION.page;
  isDisabled: boolean = false;
  role: any;

  constructor(
    private router: Router,
    private http: MainHttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.getList();
    this.formDetails();
    this.role = localStorage.getItem('role');
    if (this.role) {
      this.role = JSON.parse(this.role);
    }
  }

  formDetails() {
    this.addAgent = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(18)]],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      firstName: ['', [Validators.required, Validators.maxLength(18)]],
      surName: ['', [Validators.required, Validators.maxLength(18)]],
    });

    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(18)]],
      email: ['', [Validators.required, Validators.pattern(REGEX.EMAIL)]],
      firstName: ['', [Validators.required, Validators.maxLength(18)]],
      surName: ['', [Validators.required, Validators.maxLength(18)]],
    });
  }

  getList() {
    this.http
      .postData(APIS.AGENTS.GET_AGENT, this.paginationData)
      .subscribe((res: any) => {
        // let decryptData = JSON.parse(this.EncrDecr.get(res?.data));
        let decryptData = res?.data;
        this.agentList = decryptData.records;
        if (decryptData.total_records > 0) {
          this.displayTable = true;
        } else {
          this.displayTable = false;
        }
        this.total = decryptData.total_records;
      });
  }

  get f() {
    return this.addAgent.controls;
  }

  get controls() {
    return this.editForm.controls;
  }
  changePath() {
    if (this.role === JSON.stringify(USER_CONSTANTS.USER_TYPES.SUPER_ADMIN)) {
      this.router.navigateByUrl(PAGE_ROUTES.AGENT_MANAGEMENT);
    } else {
      this.router.navigateByUrl(PAGE_ROUTES.AGENT_PERMISSION);
    }
  }

  deleteAgent() {
    let data = {
      id: this.agentID,
    };

    this.http.putData(APIS.AGENTS.DELETE_AGENT, data).subscribe((res: any) => {
      this.agentList = this.agentList.filter((x: any) => x.id !== this.agentID);
      this.getList();
      this.toastr.success(res?.msg);
      this.showModal = false;
    });
  }
  editAgent() {

    if (this.editForm.invalid) {
      return;
    }

    let data = this.editForm.value;
    data.id = this.agentID;
    this.http.putData(APIS.AGENTS.AGENT, data).subscribe((res: any) => {
      this.toastr.success(res?.msg);
      this.getList();
      this.showModal = false;
      this.editForm.reset();
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addAgent.invalid) {
      Object.keys(this.addAgent.controls).forEach((key) =>
        this.addAgent.controls[key].markAsTouched({ onlySelf: true })
      );
      return;
    }

    this.http
      .postData(APIS.AGENTS.AGENT, this.addAgent.value)
      .subscribe((res: any) => {
        this.paginationData.page = PAGINATION.page;
        this.getList();
        this.submitted = false;
        this.addAgent.reset();
        this.toastr.success(res?.msg);
      });
  }

  changePage(event: any) {
    this.paginationData.page = event;
    // this.p = event;
    this.getList();
  }

  checkIndex(data: any) {
    this.selectedId = data;
  }

  fetchDetails(agentID: any, editMOdeValue: boolean) {
    this.agentID = agentID;
    if (editMOdeValue) {
      this.editMode = true;
      this.editForm.enable();
    } else {
      this.editForm.disable();
      this.editMode = false;
    }
    let data = {
      id: agentID,
    };
    // let encryptedData = {
    //   data: this.EncrDecr.set(JSON.stringify({ id: agentID })),
    // };
    this.http.postData(APIS.AGENTS.GET_AGENT, data).subscribe((res: any) => {
      // let decryptData = JSON.parse(this.EncrDecr.get(res?.data));
      let decryptData = res?.data;
      this.editForm.controls['name'].setValue(decryptData[0].name);
      this.editForm.controls['firstName'].setValue(decryptData[0].firstName);
      this.editForm.controls['surName'].setValue(decryptData[0].surName);
      this.editForm.controls['email'].setValue(decryptData[0].email);
    });
  }

  loggs() {
    this.router.navigateByUrl('/admin/logs');
  }

}
