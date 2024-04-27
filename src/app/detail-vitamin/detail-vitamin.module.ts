import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailVitaminPageRoutingModule } from './detail-vitamin-routing.module';

import { DetailVitaminPage } from './detail-vitamin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailVitaminPageRoutingModule
  ],
  declarations: [DetailVitaminPage]
})
export class DetailVitaminPageModule {}
