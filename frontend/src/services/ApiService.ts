import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class APIService {
	private static instance: APIService;

	private api: AxiosInstance;

	private constructor() {
		this.api = axios.create({
			baseURL: 'http://localhost:8080',
			timeout: 5000,
		});
	}

	public static getInstance(): APIService {
		if (!APIService.instance) {
			APIService.instance = new APIService();
		}
		return APIService.instance;
	}

	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response: AxiosResponse<T> = await this.api.get<T>(url, config);
		return response.data;
	}

	public async post<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		const response: AxiosResponse<T> = await this.api.post<T>(
			url,
			data,
			config
		);
		return response;
	}
}

export default APIService;
