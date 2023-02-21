import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoComponent } from '../../components/icons/logo/logo.component';
import { LoremIpsumComponent } from '../../components/lorem-ipsum/lorem-ipsum.component';

import { UpdatesPageRoutingModule } from './updates-routing.module';

import { UpdatesPage } from './updates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoComponent,
    LoremIpsumComponent,
    UpdatesPageRoutingModule,
  ],
  declarations: [UpdatesPage],
})
export class UpdatesPageModule {}
