import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KeepersPage } from './keepers.page';

const routes: Routes = [
  {
    path: '',
    component: KeepersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KeepersPageRoutingModule {}
