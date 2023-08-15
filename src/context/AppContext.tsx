import { Context, createContext, ReactNode, useState } from 'react';
import { APIService, React, toast, translate } from '../imports/commonImports';
import Paths from '../types/Paths';
import { IFieldType, IRoot, IUser } from '../types/interface';
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
	login: (userData: IFieldType) => Promise<any>;
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
	login: async (loginData: IFieldType) => {},
	logout: () => {},
};

export const AppContext: Context<AppContextType> =
	createContext<AppContextType>(initialContextValue);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
	children,
}) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [wishlist, setWishlist] = useState<string[]>([]);
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
		setIsLoggedIn(false);
	};

	const login = async (loginData: IFieldType) => {
		await APIService.getInstance()
			.post<IRoot>('/auth/login', loginData, true)
			.then((response: AxiosResponse<IRoot>) => {
				toast.success(translate('login.loginSuccess'));
				setUser(response.data.user);
				LocalStorageService.getInstance().setToken(response.data.token);
				LocalStorageService.getInstance().save<IUser>(
					'user',
					response.data.user
				);
				setIsLoggedIn(true);
			});
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
