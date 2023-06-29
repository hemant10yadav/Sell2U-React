import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import LocalStorageService from './LocalStorageService';

class APIService {
	private static instance: APIService;

	private static BASE_URL: 'http://localhost:3031';

	private api: AxiosInstance;

	private constructor() {
		this.api = axios.create({
			baseURL: APIService.BASE_URL,
			timeout: 5000,
		});

		// Add an interceptor for requests
		this.api.interceptors.request.use(
			(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
				const token = localStorage.getItem('token');
				if (token) {
					config.headers.Authorization = `Bearer ${
						LocalStorageService.getInstance().getToken().value
					}`;
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
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	private getSkipInterceptorHeader(): AxiosRequestConfig {
		return {
			headers: {
				skip: true,
			},
		};
	}

	public static getInstance(): APIService {
		if (!APIService.instance) {
			APIService.instance = new APIService();
		}
		return APIService.instance;
	}

	public async get<T>(url: string): Promise<T> {
		const response: AxiosResponse<T> = await this.api.get<T>(url);
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
}

export default APIService;
