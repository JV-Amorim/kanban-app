import { TestBed } from '@angular/core/testing';

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

    spyOn(fakeStorage, 'setItem').and.callThrough();
    spyOn(fakeStorage, 'getItem').and.callThrough();
    spyOn(fakeStorage, 'removeItem').and.callThrough();

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
    const newItemKey = 'my-item';
    const newItemData = {
      id: 1,
      name: 'My Item'
    };

    service.insertItem(newItemKey, newItemData);

    expect(fakeStorage.setItem).toHaveBeenCalledOnceWith(newItemKey, JSON.stringify(newItemData));
  });

  it('gets the item that corresponds to the specified key', () => {
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

  it('deletes the item that corresponds to the specified key', () => {
    const itemKey = 'my-item';
    const itemData = {
      id: 1,
      name: 'My Item'
    };
    service.insertItem(itemKey, itemData);
    
    service.removeItem(itemKey);

    expect(fakeStorage.removeItem).toHaveBeenCalledOnceWith(itemKey);
  });
});
