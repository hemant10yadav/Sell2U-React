import { IApiError } from '../utilities/interface';
import { AxiosError, toast, translate } from '../utilities/commonImports';

export const handleError = (error: AxiosError<IApiError>) => {
	let messageKey: string;
	if (error?.response?.data?.status && error?.response?.data?.message) {
		if (error?.response?.data.error) {
			messageKey = error.response.data.error[0].msg;
		} else {
			messageKey = error?.response?.data?.message;
		}
	} else if (error.code === 'ERR_NETWORK') {
		messageKey = 'toastMessages.badNetwork';
	} else if (error.code === 'ETIMEDOUT') {
		messageKey = 'toastMessages.timeoutError';
	} else {
		messageKey = 'toastMessages.badRequest';
	}
	toast.error(translate(messageKey));
};
