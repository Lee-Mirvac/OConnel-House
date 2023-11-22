import { Component, OnInit } from '@angular/core';
import {      Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { APIS, REGEX } from 'src/app/common/constants';
import { CommonService } from 'src/app/core/services/common.service';
import { HttpService } from 'src/app/core/services/http.service';
import { SweetService } from 'src/app/core/services/sweet.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {

}
