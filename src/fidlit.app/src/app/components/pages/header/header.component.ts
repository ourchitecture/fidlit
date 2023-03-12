import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LogoComponent } from '../../icons/logo/logo.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, LogoComponent, RouterModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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
