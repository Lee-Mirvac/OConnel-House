import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/components/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: LocationComponent,
  },
];

@NgModule({
  declarations: [LocationComponent,],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class LocationModule implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
