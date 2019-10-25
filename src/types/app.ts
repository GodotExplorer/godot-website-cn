export enum RouterIndex {
	HOME = '/',
	SIGNUP = '/signup',
	SIGNIN = '/signin',
	PASSWORD_RESET = '/password_reset',
	CUMUNITY = '/cummunity',
	DOWNLOAD = '/download',
	LEARN = '/learn',
}

export interface MenuItem {
	title: string;
	align: 'left' | 'right',
	path: RouterIndex,
}

export const HeaderMenus: MenuItem[] = [
	{ title: "特性", path: RouterIndex.HOME, align: 'left' },
	{ title: "社区", path: RouterIndex.CUMUNITY, align: 'left' },
	{ title: "学习", path: RouterIndex.LEARN, align: 'right' },
	{ title: "下载", path: RouterIndex.DOWNLOAD, align: 'right' },
];
