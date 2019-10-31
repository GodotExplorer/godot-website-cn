export enum RouterIndex {
	HOME = '/',
	SIGNUP = '/signup',
	SIGNIN = '/signin',
	PASSWORD_RESET = '/password_reset',
	CUMUNITY = '/cummunity',
	DOWNLOAD = '/download',
	LEARN = '/learn',
	PROFILE = '/profile',
	CUMUNITY_NEW_POST = '/cummunity_new_post',
}

export interface MenuItem {
	title: string;
	align: 'left' | 'right',
	path: RouterIndex,
}

export const HeaderMenus: MenuItem[] = [
	{ title: "特性", path: RouterIndex.HOME, align: 'left' },
	{ title: "下载", path: RouterIndex.DOWNLOAD, align: 'left' },
	{ title: "学习", path: RouterIndex.LEARN, align: 'right' },
	{ title: "社区", path: RouterIndex.CUMUNITY, align: 'right' },
];
