export default class Paths {
	public static AUTH = '/auth';

	public static SIGNUP = `${this.AUTH}/signup`;

	public static LOGIN = `${this.AUTH}/login`;

	public static RESET_PASSWORD = '/reset-password';

	public static USERS = '/users';

	public static ADD = '/add';

	public static Products = '/products';

	public static RESOURCES = '/resources';

	public static CURRENT = `${this.USERS}/current`;

	public static WISHLIST = '/wishlist';

	public static ORDER = '/order';

	public static readonly RESOURCE_DIR = 'public/resources';

	public static readonly VERIFY = '/verify';
}
