import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LogoComponent } from '../../icons/logo/logo.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, LogoComponent, RouterModule],
  selector: 'app-ios-header',
  templateUrl: './ios-header.component.html',
  styleUrls: ['./ios-header.component.scss'],
})
export class IosHeaderComponent implements OnInit {
  @Input() title: string = 'Fidlit';

  constructor(private themeService: ThemeService) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.themeService.initialize();
    } catch (error) {
      // TODO: log errors
      console.error('Unexpected error initializing the ThemeService', error);
    }
  }

  public toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
}
