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
		return <IToken>this.getInLocalStorage('token');
	}

	public setToken(value: string) {
		const tokenObject: IToken = {
			timestamp: new Date(),
			value,
		};
		this.saveInLocalStorage('token', tokenObject);
	}

	public saveInLocalStorage(key: string, value: object | string) {
		this.storage.setItem('token', JSON.stringify(value));
	}

	public getInLocalStorage<T>(key: string): T | null {
		const value = this.storage.getItem(key);
		if (value) {
			return JSON.parse(value) as T;
		}
		return null;
	}
}

export default LocalStorageService;
