import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailExhibitPage } from './detail-exhibit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailExhibitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailExhibitPageRoutingModule {}
