import { Context, createContext, ReactNode, useState } from 'react';
import {
	APIService,
	React,
	toast,
	translate,
} from '../utilities/commonImports';
import Paths from '../utilities/Paths';
import { IFieldType, IRoot, IUser } from '../utilities/interface';
import { AxiosResponse } from 'axios';
import LocalStorageService from '../services/LocalStorageService';

type CartItem = {
	id: string;
	name: string;
	price: number;
	quantity: number;
};

// Define the type for the context's value
type AppContextType = {
	cart: CartItem[];
	wishlist: string[]; // We will store product IDs in the wishlist
	user: IUser | null;
	isLoggedIn: boolean;
	addToCart: (item: CartItem) => void;
	removeFromCart: (itemId: string) => void;
	addToWishlist: (productId: string) => Promise<any>;
	removeFromWishlist: (productId: string) => Promise<any>;
	login: (userData: IFieldType | null) => Promise<any>;
	logout: () => void;
};

type AppContextProviderProps = {
	children: ReactNode;
};

const initialContextValue: AppContextType = {
	cart: [],
	wishlist: [],
	user: null,
	isLoggedIn: false,
	addToCart: () => {},
	removeFromCart: () => {},
	addToWishlist: async (productId: string) => {},
	removeFromWishlist: async (productId: string) => {},
	login: async (loginData: IFieldType | null) => {},
	logout: () => {},
};

export const AppContext: Context<AppContextType> =
	createContext<AppContextType>(initialContextValue);

const loginWithUserCredentials = (
	userCredentials: IFieldType
): Promise<IUser | void> => {
	return APIService.getInstance()
		.post<IRoot>(Paths.LOGIN, userCredentials, true)
		.then(
			(response: AxiosResponse<IRoot>) => {
				toast.success(translate('login.loginSuccess'));
				LocalStorageService.getInstance().setToken(response.data.token);
				return response.data.user;
			},
			() => {}
		);
};

const getCurrentUser = (): Promise<IUser | void> => {
	if (LocalStorageService.getInstance().getToken()) {
		return APIService.getInstance().get<IUser>(Paths.CURRENT);
	}
	return Promise.resolve();
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [wishlist, setWishlist] = useState<string[]>([]);
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	// useEffect(() => {
	// 	if (!isLoggedIn) {
	// 		getCurrentUser()
	// 			.then((resUser) => {
	// 				if (resUser) {
	// 					setIsLoggedIn(true);
	// 					setUser(resUser);
	// 				}
	// 			})
	// 			.catch(() => {});
	// 	}
	// }, []);

	const addToCart = (item: CartItem) => {
		setCart((prevCart) => [...prevCart, item]);
	};

	// eslint-disable-next-line @typescript-eslint/require-await
	const removeFromCart = (itemId: string) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
	};

	const addToWishlist = async (productId: string) => {
		await APIService.getInstance()
			.post(`${Paths.CURRENT}${Paths.WISHLIST}/${productId}`, {}, false)
			.then(() => {
				setWishlist((prevWishlist) => [...prevWishlist, productId]);
			});
	};

	const removeFromWishlist = async (productId: string) => {
		await APIService.getInstance()
			.delete(`${Paths.CURRENT}${Paths.WISHLIST}/${productId}`, {}, false)
			.then(() => {
				setWishlist((prevWishlist) =>
					prevWishlist.filter((id) => id !== productId)
				);
			});
	};

	const logout = () => {
		LocalStorageService.getInstance().clearAll();
		setUser(null);
		setIsLoggedIn(false);
		setCart([]);
		setWishlist([]);
	};

	const login = async (loginData: IFieldType | null) => {
		console.log('INSIDE LOGIN', isLoggedIn);
		if (!isLoggedIn) {
			let tempUser: IUser | void;
			if (loginData) {
				tempUser = await loginWithUserCredentials(loginData);
			} else if (LocalStorageService.getInstance().getToken()) {
				tempUser = await getCurrentUser();
				console.log(tempUser);
			}
			if (tempUser) {
				setUser(tempUser);
				setIsLoggedIn(true);
				console.log('LOGGED IN');
			}
			console.log('LOGGED OUT');
		}
		console.log('LOGGED IN');
	};

	const contextValue: AppContextType = {
		cart,
		wishlist,
		user,
		isLoggedIn,
		addToCart,
		removeFromCart,
		addToWishlist,
		removeFromWishlist,
		login,
		logout,
	};

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
};
