import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeeperDetailPageRoutingModule } from './keeper-detail-routing.module';

import { KeeperDetailPage } from './keeper-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeeperDetailPageRoutingModule
  ],
  declarations: [KeeperDetailPage]
})
export class KeeperDetailPageModule {}
