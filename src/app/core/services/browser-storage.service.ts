import { Injectable } from '@angular/core';

import { BrowserStorageErrors } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor(private browserStorage: Storage) { }

  insertItem<T>(key: string, data: T): void {
    try {
      const json = JSON.stringify(data);
      this.browserStorage.setItem(key, json);
    }
    catch {      
      throw new Error(BrowserStorageErrors.InsertionError);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const json = this.browserStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    }
    catch {
      throw new Error(BrowserStorageErrors.GetError);      
    }
  }

  removeItem(key: string): void {
    try {
      this.browserStorage.removeItem(key);
    }
    catch {
      throw new Error(BrowserStorageErrors.DeletionError);
    }
  }
}
