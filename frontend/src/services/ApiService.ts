import { axios, AxiosResponse } from './Axios';
interface ApiResponse<T> {
	data: T;
}

const httpGet = <T>(
	url: string,
	auth = true
): Promise<AxiosResponse<ApiResponse<T>>> => {
	return axios.get<ApiResponse<T>>(url);
};

const httpPost = <T>(
	url: string,
	data: object,
	auth = true
): Promise<AxiosResponse<ApiResponse<T>>> => {
	return axios.post<ApiResponse<T>>(url, data);
};

const httpPut = <T>(
	url: string,
	data: object,
	auth = true
): Promise<AxiosResponse<ApiResponse<T>>> => {
	return axios.put<ApiResponse<T>>(url, data);
};

const httpDelete = <T>(
	url: string,
	data: object,
	auth = true
): Promise<AxiosResponse<ApiResponse<T>>> => {
	return axios.delete<ApiResponse<T>>(url, data);
};

const ApiService = {
	httpGet,
	httpPost,
	httpPut,
	httpDelete,
};

export default ApiService;
