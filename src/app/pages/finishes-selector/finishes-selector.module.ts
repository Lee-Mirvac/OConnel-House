import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishesSelectorComponent } from './finishes-selector.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/components/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FinishesSelectorComponent,
  },
];

@NgModule({
  declarations: [FinishesSelectorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class FinishesSelectorModule {}
