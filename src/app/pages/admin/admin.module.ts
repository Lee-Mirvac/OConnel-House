import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { InputRestrictionDirective } from 'src/app/components/shared/directives/space-restriction.directive';
import { AgentManagementComponent } from './agent-management/agent-management.component';
import { StockAllocationComponent } from './stock-allocation/stock-allocation.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmailComponent } from './email/email.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ButtonModule } from 'primeng/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: AdminComponent, children: [
      {
        path: '', redirectTo: 'agent-management', pathMatch: 'full'
      },
      {
        path: 'agent-management', component: AgentManagementComponent
      },
      {
        path: 'stock-allocation', component: StockAllocationComponent
      },
      {
        path: 'email', component: EmailComponent
      },

    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    InputRestrictionDirective,
    AgentManagementComponent,
    StockAllocationComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
    NgxPaginationModule,
    ButtonModule,
    SharedModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
  ]
})
export class AdminModule { }
