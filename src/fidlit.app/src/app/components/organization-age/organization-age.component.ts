import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';

import { IonicModule, SelectCustomEvent } from '@ionic/angular';

import {
  OrganizationTimeAge,
  OrganizationTimeService,
} from 'src/app/services/organization-time.service';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-organization-age',
  templateUrl: './organization-age.component.html',
  styleUrls: ['./organization-age.component.scss'],
})
export class OrganizationAgeComponent implements OnInit {
  organizationSpeedMultiplier = 1;

  organizationAge: OrganizationTimeAge = {
    total: {
      milliseconds: 0,
    },
    parts: {
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  };

  isOrganizationAgeRunning = false;

  constructor(private organizationTimeService: OrganizationTimeService) {}

  async ngOnInit(): Promise<void> {
    this.organizationTimeService.onAgeUpdated.subscribe((age) => {
      // console.debug('HomePage: organizationTimeService.onAgeUpdated()');
      this.organizationAge = age;
    });

    this.organizationTimeService.onSpeedMultiplierUpdated.subscribe(
      (multiplier) => {
        // console.debug(
        //   'HomePage: organizationTimeService.onSpeedMultiplierUpdated()'
        // );
        this.organizationSpeedMultiplier = multiplier;
      }
    );

    this.organizationTimeService.initialize();
  }

  playOrganizationTime() {
    // console.debug('HomePage: playOrganizationTime()');
    this.organizationTimeService.play();
    this.isOrganizationAgeRunning = true;
  }

  pauseOrganizationTime() {
    // console.debug('HomePage: pauseOrganizationTime()');
    this.organizationTimeService.pause();
    this.isOrganizationAgeRunning = false;
  }

  resetOrganizationTime() {
    // console.debug('HomePage: resetOrganizationTime()');
    this.organizationTimeService.reset();
    this.isOrganizationAgeRunning = false;
  }

  setOrganizationTimeSpeedMultiplier(ev: Event) {
    const multiplier = (ev as SelectCustomEvent).detail.value as number;

    // console.debug('setOrganizationTimeSpeedMultiplier', multiplier);

    this.organizationTimeService.updateSpeedMultiplier(multiplier);
  }
}
