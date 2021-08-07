/*
Add to you app.module to make it work:
import: NgxWebstorageModule.forRoot()
 */
import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService, SyncStorage} from 'ngx-webstorage';

interface StorageItem<T> {
	value: T;
	expire: string;
}

export enum StorageTypes {
	Local = 'local',
	Session = 'session',
}

@Injectable({
	providedIn: 'root',
})
export class DataStorageService {
	constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {}

	public get<T>(storageType: StorageTypes, key: string): T {
		let res = null;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const stringValue: string = this.storageApi(storageType).retrieve(key);
		if (stringValue !== null) {
			const value: StorageItem<T> = JSON.parse(stringValue);
			if (!value.expire || new Date(value.expire) > new Date()) {
				res = value.value;
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				this.storageApi(storageType).clear(key);
			}
		}
		return res;
	}

	public delete(storageType: StorageTypes, key: string): void {
		this.storageApi(storageType).clear(key);
	}

	public set<T>(storageType: StorageTypes, key: string, val: T, expirationInSec: number = null): void {
		let expirationDate: Date;
		if (expirationInSec) {
			expirationDate = new Date(new Date().getTime() + 1000 * expirationInSec);
		} else {
			expirationDate = new Date('2100-01-01 00:00:00');
		}
		const newValue: StorageItem<T> = {
			value: val,
			expire: expirationDate.toISOString(),
		};
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		this.storageApi(storageType).store(key, JSON.stringify(newValue));
	}

	private storageApi(storageType: StorageTypes): SyncStorage {
		switch (storageType) {
			case StorageTypes.Local:
				return this.localStorage;
			case StorageTypes.Session:
				return this.sessionStorage;
		}
	}
}
