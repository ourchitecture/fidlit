import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoComponent } from '../../components/icons/logo/logo.component';
import { LoremIpsumComponent } from '../../components/lorem-ipsum/lorem-ipsum.component';
import { HeaderComponent } from '../../components/pages/header/header.component';
import { IosHeaderComponent } from '../../components/pages/ios-header/ios-header.component';

import { ThemePageRoutingModule } from './theme-routing.module';

import { ThemePage } from './theme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonicModule,
    IosHeaderComponent,
    LogoComponent,
    LoremIpsumComponent,
    ThemePageRoutingModule,
  ],
  declarations: [ThemePage],
})
export class ThemePageModule {}
