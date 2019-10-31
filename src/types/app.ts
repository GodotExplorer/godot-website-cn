export enum RouterIndex {
	HOME = '/',
	SIGNUP = '/signup',
	SIGNIN = '/signin',
	PASSWORD_RESET = '/password_reset',
	COMMUNITY = '/cummunity',
	DOWNLOAD = '/download',
	LEARN = '/learn',
	PROFILE = '/profile',
	COMMUNITY_NEW_POST = '/cummunity_new_post',
	COMMUNITY_POST = '/cummunity_post/:id',
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
	{ title: "社区", path: RouterIndex.COMMUNITY, align: 'right' },
];

import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
