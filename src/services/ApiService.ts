import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import LocalStorageService from './LocalStorageService';
import { IApiError, IToken } from '../utilities/interface';
import { BASE_URL } from '../utilities/constants';
import { handleError } from './ErrorHandler';

class APIService {
	private static instance: APIService;

	private api: AxiosInstance;

	private constructor() {
		this.api = axios.create({
			baseURL: BASE_URL,
			timeout: 5000,
		});

		// Add an interceptor for requests
		this.api.interceptors.request.use(
			(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
				const token: IToken = LocalStorageService.getInstance().getToken();
				if (token) {
					config.headers.Authorization = 'Bearer ' + token.value;
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		// Add an interceptor for responses
		this.api.interceptors.response.use(
			(response: AxiosResponse): AxiosResponse => {
				return response;
			},
			(error: AxiosError<IApiError>) => {
				handleError(error);
				return Promise.reject(error);
			}
		);
	}

	public static getInstance(): APIService {
		if (!APIService.instance) {
			APIService.instance = new APIService();
		}
		return APIService.instance;
	}

	public async get<T>(url: string, skipAuth = false): Promise<T> {
		const response: AxiosResponse<T> = await this.api.get<T>(
			url,
			skipAuth ? this.getSkipInterceptorHeader() : {}
		);
		return response.data;
	}

	public async post<T>(
		url: string,
		data: object,
		skipAuth = false
	): Promise<AxiosResponse<T>> {
		return this.api.post<T>(
			url,
			data,
			skipAuth ? this.getSkipInterceptorHeader() : {}
		);
	}

	public async delete<T>(
		url: string,
		data: object,
		skipAuth = false
	): Promise<AxiosResponse<T>> {
		return this.api.delete<T>(
			url,
			skipAuth ? this.getSkipInterceptorHeader() : {}
		);
	}

	private getSkipInterceptorHeader(): AxiosRequestConfig {
		return {
			headers: {
				skip: true,
			},
		};
	}
}

export default APIService;
