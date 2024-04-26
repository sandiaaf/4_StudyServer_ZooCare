import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KeepersPageRoutingModule } from './keepers-routing.module';

import { KeepersPage } from './keepers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KeepersPageRoutingModule
  ],
  declarations: [KeepersPage]
})
export class KeepersPageModule {}
