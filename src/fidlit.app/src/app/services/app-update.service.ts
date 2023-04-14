import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { SwUpdate } from '@angular/service-worker';

import { WindowRef } from '../WindowRef';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(
    private readonly serviceWorkerUpdate: SwUpdate,
    private toastController: ToastController,
    private windowRef: WindowRef
  ) {}

  public setup() {
    console.debug('AppUpdateService.setup(): listening for updates...');

    this.serviceWorkerUpdate.versionUpdates.subscribe((versionUpdatesEvent) => {
      const evt: any = versionUpdatesEvent;

      console.debug('SwUpdate "versionUpdates" Event...');

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
          this.notifyUpdateAvailable();
          return;
        // case 'NO_NEW_VERSION_DETECTED':
        default:
          return;
      }
    });
  }

  private async notifyUpdateAvailable() {
    const toast = await this.toastController.create({
      message: 'New updates are available!',
      duration: 1500,
      position: 'bottom',
      buttons: [
        {
          text: 'Update',
          role: 'update',
        },
      ],
    });

    await toast.present();

    // const { role } = await toast.onDidDismiss();
    await toast.onDidDismiss();

    await this.serviceWorkerUpdate.activateUpdate();

    this.windowRef?.nativeWindow.document.location.reload();
  }
}
