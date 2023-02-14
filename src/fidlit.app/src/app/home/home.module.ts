import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { AvatarIconComponent } from '../components/icons/avatar/avatar.component';
import { LogoComponent } from '../components/icons/logo/logo.component';
import { OrganizationAgeComponent } from '../components/organization-age/organization-age.component';

@NgModule({
  imports: [
    AvatarIconComponent,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    HttpClientModule,
    IonicModule,
    LogoComponent,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    OrganizationAgeComponent,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
