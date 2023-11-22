import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { InputRestrictionDirective } from 'src/app/components/shared/directives/space-restriction.directive';
import { AgentManagementComponent } from './agent-management/agent-management.component';
import { StockAllocationComponent } from './stock-allocation/stock-allocation.component';

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

    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    InputRestrictionDirective,
    AgentManagementComponent,
    StockAllocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
 
  ]
})
export class AdminModule { }
