import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailVitaminPage } from './detail-vitamin.page';

const routes: Routes = [
  {
    path: '',
    component: DetailVitaminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailVitaminPageRoutingModule {}
