import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MirvacComponent } from './mirvac.component';
import { HistoryComponent } from './history/history.component';
import { NewsComponent } from './news/news.component';
import { QualityComponent } from './quality/quality.component';
import { AwardsComponent } from './awards/awards.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'',component:MirvacComponent,children:[
      {
        path:'',redirectTo:'history', pathMatch:'full'
      },
      {
        path:'history',component:HistoryComponent
      },
      {
        path:'news',component:NewsComponent
      },
      {
        path:'quality',component:QualityComponent
      },
      {
        path:'awards',component:AwardsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    MirvacComponent,
    HistoryComponent,
    NewsComponent,
    QualityComponent,
    AwardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MirvacModule { }
