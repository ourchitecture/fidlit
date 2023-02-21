import { EventEmitter, Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(private readonly serviceWorkerUpdate: SwUpdate) {
    this.serviceWorkerUpdate.versionUpdates.subscribe((versionUpdatesEvent) => {
      const evt: any = versionUpdatesEvent;

      switch (versionUpdatesEvent.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          return;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${evt.version.hash}': ${evt.error}`
          );
          return;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${evt.latestVersion.hash}`
          );
          return;
        // case 'NO_NEW_VERSION_DETECTED':
        default:
          return;
      }
    });
  }
}
