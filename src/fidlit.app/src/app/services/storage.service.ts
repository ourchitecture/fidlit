import { isPlatformServer } from '@angular/common';
import {
  Injectable,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';

import { Storage, StorageConfig } from '@ionic/storage';

const StorageConfigToken = new InjectionToken<any>('STORAGE_CONFIG_TOKEN');

export { StorageConfig, StorageConfigToken, Storage };

class NoopStorage extends Storage {
  constructor() {
    super();
  }
  override async create() {
    return this;
  }
  override async defineDriver() {}
  override get driver(): string | null {
    return 'noop';
  }
  override async get(key: string) {
    return null;
  }
  override async set(key: string, value: any) {}
  override async remove(key: string): Promise<any> {}
  override async clear(): Promise<void> {}
  override async length(): Promise<number> {
    return 0;
  }
  override async keys() {
    return [];
  }
  override async forEach(
    iteratorCallback: (value: any, key: string, iterationNumber: Number) => any
  ): Promise<void> {}
  override setEncryptionKey(key: string) {}
}

export function provideStorage(
  this: any,
  storageConfig: StorageConfig
): Storage {
  if (isPlatformServer(this.platformId)) {
    // When running in a server context return the NoopStorage
    return new NoopStorage();
  }

  return new Storage(storageConfig);
}

@NgModule()
export class IonicStorageModule {
  static forRoot(
    storageConfig: StorageConfig | null = null
  ): ModuleWithProviders<IonicStorageModule> {
    return {
      ngModule: IonicStorageModule,
      providers: [
        { provide: StorageConfigToken, useValue: storageConfig },
        {
          provide: Storage,
          useFactory: provideStorage,
          deps: [StorageConfigToken],
        },
      ],
    };
  }
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async initialize() {
    this._storage = await this.storage.create();
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
}
