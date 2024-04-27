import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailExhibitPageRoutingModule } from './detail-exhibit-routing.module';

import { DetailExhibitPage } from './detail-exhibit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailExhibitPageRoutingModule
  ],
  declarations: [DetailExhibitPage]
})
export class DetailExhibitPageModule {}
