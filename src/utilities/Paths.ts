/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class Paths {
	public static readonly AUTH = '/auth';
	public static readonly SIGNUP = `${this.AUTH}/signup`;
	public static readonly LOGIN = `${this.AUTH}/login`;
	public static readonly RESET_PASSWORD = '/reset-password';
	public static readonly USERS = '/users';
	public static readonly ADD = '/add';
	public static readonly Products = '/products';
	public static readonly RESOURCES = '/resources';
	public static readonly CURRENT = `${this.USERS}/current`;
	public static readonly WISHLIST = '/wishlist';
	public static readonly ORDER = '/order';
	public static readonly RESOURCE_DIR = 'public/resources';
	public static readonly VERIFY = '/verify';
	public static readonly EMAIL = '/email';
}
