import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEYS_APP_DARK_MODE = 'app_dark-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private wasDarkModeToggleEnabled = false;
  private isDarkModeToggleEnabled = false;

  constructor(
    private storage: Storage,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async initialize() {
    await this.storage?.create();

    this.wasDarkModeToggleEnabled =
      await this.getIsDarkModeEnabledFromStorage();

    this.isDarkModeToggleEnabled = this.wasDarkModeToggleEnabled;
  }

  public getIsDarkModeEnabled() {
    return this.isDarkModeToggleEnabled;
  }

  public async toggleDarkMode() {
    if (!this.storage) {
      return;
    }

    // out of sync detection
    if (this.isDarkModeToggleEnabled != this.wasDarkModeToggleEnabled) {
      console.debug('toggleDarkMode: already in sync');
      return;
    }

    // remember the toggled setting
    this.wasDarkModeToggleEnabled = !this.isDarkModeToggleEnabled;

    // store the toggled setting
    await this.storage.set(
      STORAGE_KEYS_APP_DARK_MODE,
      this.wasDarkModeToggleEnabled
    );

    console.debug(
      'toggleDarkMode: toggling CSS class',
      this.wasDarkModeToggleEnabled
    );

    document.body.classList.toggle('dark', this.wasDarkModeToggleEnabled);

    // update the toggled setting
    this.isDarkModeToggleEnabled = this.wasDarkModeToggleEnabled;
  }

  private getWindow(): Window | null {
    return this.document.defaultView;
  }

  private async getIsDarkModeEnabledFromStorage() {
    const storageIsDarkModeEnabled = await this.storage?.get(
      STORAGE_KEYS_APP_DARK_MODE
    );

    let isDarkModeEnabled = true;

    // if a preference has never been set, read the system preference
    if (storageIsDarkModeEnabled == null) {
      const isDarkModePreferred = this.getWindow()?.matchMedia(
        '(prefers-color-scheme: dark)'
      );

      isDarkModeEnabled = isDarkModePreferred ? true : false;
    } else {
      isDarkModeEnabled = storageIsDarkModeEnabled ? true : false;
    }

    console.debug(
      'getIsDarkModeEnabledFromStorage: toggling CSS class',
      isDarkModeEnabled
    );

    this.document.body.classList.toggle('dark', isDarkModeEnabled);

    return isDarkModeEnabled;
  }
}
