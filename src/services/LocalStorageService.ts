import { IToken } from '../models/interface';

class LocalStorageService {
	private static instance: LocalStorageService;

	private storage: Storage = localStorage;

	public static getInstance(): LocalStorageService {
		if (!LocalStorageService.instance) {
			LocalStorageService.instance = new LocalStorageService();
		}
		return LocalStorageService.instance;
	}

	public getToken(): IToken {
		return <IToken>this.get('token');
	}

	public setToken(value: string) {
		const tokenObject: IToken = {
			timestamp: new Date(),
			value,
		};
		this.save('token', tokenObject);
	}

	public save<T>(key: string, value: T) {
		this.storage.setItem(key, JSON.stringify(value));
	}

	public get<T>(key: string): T | null {
		const value = this.storage.getItem(key);
		if (value) {
			let returnValue;
			try {
				returnValue = JSON.parse(value) as T;
			} catch (e) {
				returnValue = value;
			}
			return returnValue as T;
		}
		return null;
	}
}

export default LocalStorageService;
