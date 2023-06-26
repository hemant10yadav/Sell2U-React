import axios, { AxiosResponse } from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:8080/',
});

export { http as axios };
export type { AxiosResponse };
