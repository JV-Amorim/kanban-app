import { TestBed } from '@angular/core/testing';

import { BrowserStorageErrors } from '@core/models';
import { BrowserStorageService } from './browser-storage.service';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;

  type FakeStorageItem = {
    key: string,
    value: string
  };
  type FakeStorageItems = {
    items: FakeStorageItem[]
  };

  let fakeStorage: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> & FakeStorageItems;
  
  beforeEach(async () => {
    fakeStorage = {
      items: [],
      setItem(key: string, value: string): void {
        this.items.push({ key, value });
      },
      getItem(key: string): string | null {
        return this.items.find(item => item.key === key)?.value ?? null;
      },
      removeItem(key: string): void {
        this.items = this.items.filter(item => item.key !== key);
      }
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: fakeStorage }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(BrowserStorageService);
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  it('inserts a new item with the specified key', () => {
    spyOn(fakeStorage, 'setItem').and.callThrough();

    const newItemKey = 'my-item';
    const newItemData = {
      id: 1,
      name: 'My Item'
    };

    service.insertItem(newItemKey, newItemData);

    expect(fakeStorage.setItem).toHaveBeenCalledOnceWith(newItemKey, JSON.stringify(newItemData));
  });

  it('throws an error if insert operation fails', () => {
    spyOn(fakeStorage, 'setItem').and.throwError(BrowserStorageErrors.InsertionError);

    expect(() => service.insertItem('key', 'data')).toThrowError(BrowserStorageErrors.InsertionError);
  });

  it('gets the item that corresponds to the specified key', () => {
    spyOn(fakeStorage, 'getItem').and.callThrough();

    const itemKey = 'my-item';
    const itemData = {
      id: 1,
      name: 'My Item'
    };
    service.insertItem(itemKey, itemData);
    
    const actualItemData = service.getItem<typeof itemData>(itemKey);

    expect(fakeStorage.getItem).toHaveBeenCalledOnceWith(itemKey);
    expect(actualItemData).toEqual(itemData);
  });

  it('throws an error if get operation fails', () => {
    spyOn(fakeStorage, 'getItem').and.throwError(BrowserStorageErrors.GetError);

    expect(() => service.getItem('key')).toThrowError(BrowserStorageErrors.GetError);
  });

  it('deletes the item that corresponds to the specified key', () => {
    spyOn(fakeStorage, 'removeItem').and.callThrough();
    
    const itemKey = 'my-item';
    const itemData = {
      id: 1,
      name: 'My Item'
    };
    service.insertItem(itemKey, itemData);
    
    service.removeItem(itemKey);

    expect(fakeStorage.removeItem).toHaveBeenCalledOnceWith(itemKey);
  });

  it('throws an error if delete operation fails', () => {
    spyOn(fakeStorage, 'removeItem').and.throwError(BrowserStorageErrors.DeletionError);

    expect(() => service.removeItem('key')).toThrowError(BrowserStorageErrors.DeletionError);
  });
});
