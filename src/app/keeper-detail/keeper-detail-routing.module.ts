import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeeperDetailPage } from './keeper-detail.page';

const routes: Routes = [
  {
    path: '',
    component: KeeperDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeeperDetailPageRoutingModule {}
