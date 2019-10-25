import { EventDispatcher } from "events/EventDispatcher";
import axios, { AxiosRequestConfig } from 'axios';
import * as base64url from "base64-url";
import * as querystring from "querystring";
import config from "./config";

const USER_TOKEN_STORAGE_NAME = 'user_token';

enum SupportedAPI {
	REQUEST_VERIFY_CODE = '/v1/verify_code/request',
	USER_SIGNUP = '/v1/user/signup',
	USER_SIGNIN = '/v1/user/signin',
	USER_GET_INFO = '/v1/user/:id',
	USER_RESET_PASSWORD = '/v1/user/reset_password',
	USER_SET_PROFILE = '/v1/user/profile/:id',
	FILES_UPLOAD = '/v1/files/upload',
	FILES_GET = '/v1/files/get',
	COMMUNITY_LIST_POSTS = '/v1/community/posts',
	COMMUNITY_NEW_POST = '/v1/community/post/new',
	COMMUNITY_DELETE_POST = '/v1/community/post/delete/:id',
	COMMUNITY_POST = '/v1/community/post/:id',
	COMMUNITY_LIST_COMMENTS = '/v1/community/comments/:id',
	COMMUNITY_NEW_COMMENT = '/v1/community/comment/new',
	COMMUNITY_DELETE_COMMENT = '/v1/community/comment/delete/:id',
	COMMUNITY_COMMENT = '/v1/community/comment/:id',
}

export class Server extends EventDispatcher {
	/** API 地址 */
	readonly api_url: string;
	/** 登陆的用户 */
	private _user : model.User = null;
	public get user() : model.User { return this._user; }

	/** 用户登录记录 */
	private jwt_payload: API.JWTPayload = null;
	private _token : API.LoginToken = null;
	/** 登录后获取到的API访问令牌 */
	public get token() : API.LoginToken { return this._token; }
	public set token(v : API.LoginToken) {
		if (v) {
			axios.defaults.headers.common.Authorization = v.token;
			window.localStorage.setItem(USER_TOKEN_STORAGE_NAME, JSON.stringify(v));
			const payload: API.JWTPayload = JSON.parse(base64url.decode(v.token.split('.')[1]));
			if (payload.expire > (new Date()).getTime()) {
				this.jwt_payload = payload;
				this.get_user_info(v.id).then(user=>{
					this._user = user;
				}).catch(err=>{
					console.error("获取用户信息失败", err);
				});
			} else {
				v = null;
			}
		}
		this._token = v;
	}

	constructor(api_url: string) {
		super();
		this.api_url = api_url;
		this.token = JSON.parse(window.localStorage.getItem(USER_TOKEN_STORAGE_NAME) || 'null');
	}

	/** 请求发送验证码 */
	async request_verify_code(params: API.VerifyCodeRequestParam) {
		return await this.post(SupportedAPI.REQUEST_VERIFY_CODE, params);
	}

	/** 发起 POST 请求 */
	private async post(api: SupportedAPI | string, params?: any, config?: AxiosRequestConfig) {
		try {
			const ret = await axios.post(`${this.api_url}${api}`, params, config);
			return ret.data || ret;
		} catch (error) {
			if (error && error.response) {
				throw error.response.data || error.response;
			} else {
				throw error;
			}
		}
	}

	/** 发起 GET 请求 */
	private async get(api: SupportedAPI | string, params?: object, config?: AxiosRequestConfig) {
		try {
			let url: string = `${this.api_url}${api}`;
			if (params) {
				url += `?${querystring.stringify(params as any)}`;
			}
			const ret = await axios.get(url, config);
			return ret.data || ret;
		} catch (error) {
			if (error && error.response) {
				throw error.response.data || error.response;
			} else {
				throw error;
			}
		}
	}


	/** 用户注册 */
	async signup(params: API.SignupParam) {
		const token: API.LoginToken = await this.post(SupportedAPI.USER_SIGNUP, params);
		this.token = token;
		return token;
	}

	/** 用户登陆 */
	async signin(params: API.SigninParam) {
		const token: API.LoginToken = await this.post(SupportedAPI.USER_SIGNIN, params);
		this.token = token;
		return token;
	}

	/** 重置密码,完成后自动登陆 */
	async reset_password(params: API.ResetPasswordParam) {
		const token: API.LoginToken = await this.post(SupportedAPI.USER_RESET_PASSWORD, params);
		this.token = token;
		return token;
	}

	/** 获取用户信息 */
	async get_user_info(id: string) {
		const r: model.User = await this.get(SupportedAPI.USER_GET_INFO.replace(':id', id));
		return r;
	}

	/** 设置用户信息 */
	async set_profile(params: API.SetProfileParam) {
		const r: model.User = await this.post(SupportedAPI.USER_SET_PROFILE.replace(':id', this.get_user_id()));
		return r;
	}

	/**
	 * 上传文件
	 *
	 * @param {File} file 文件对象
	 * @param {boolean} [is_public=false] 是否所有人对该上传的文件具有访问权限
	 * @param {{[key: string]: string}} [params] 附加参数
	 * @returns {string[]} 返回服务器存储后的路径列表
	 * @memberof Server
	 */
	async upload_file(file: File, is_public: boolean = false, params?: {[key: string]: string}) {
		const form = new FormData();
		form.append(file.name, file);
		params = params || {};
		if (is_public) params.public = 'true';
		for (const key in params) {
			form.append(key, params[key]);
		}
		const config = {
			headers: { 'content-type': 'multipart/form-data' }
		};
		return await this.post(SupportedAPI.FILES_UPLOAD, form, config) as string[];
	}

	/** 通过服务器文件路径获取访问 URL */
	get_file_url(path: string) {
		let token = this.token ? `&token=${this.token.token}` : '';
		return `${SupportedAPI.FILES_GET}?path=${path}${token}`;
	}

	/** 获取用户ID */
	get_user_id(): string {
		return this._token ? this._token.id : null;
	}

	/**
	 * 获取帖子列表
	 * @param params 列表分页配置
	 */
	async get_posts(params?: API.ListPostsParam) {
		params = params || {page: 1, page_size: 10};
		return await this.get(SupportedAPI.COMMUNITY_LIST_POSTS, params) as model.PostSeed[];
	}

	/**
	 * 获取评论列表
	 *
	 * @param {API.ListCommentsParam} params
	 * @returns
	 * @memberof Server
	 */
	async get_comments(params: API.ListCommentsParam) {
		return await this.get(SupportedAPI.COMMUNITY_LIST_COMMENTS.replace(":id", params.target), params) as model.Comment[];
	}

	/**
	 * 获取帖子
	 * @param id 文章ID
	 */
	async get_post(id: string) {
		return await this.get(SupportedAPI.COMMUNITY_POST.replace(":id", id)) as model.Post;
	}

	/**
	 * 更新帖子, 只能更新自己发表的帖子, 否则抛出异常
	 * @param post 修改后的文章对象
	 */
	async update_post(post: model.Post) {
		return await this.post(SupportedAPI.COMMUNITY_POST.replace(":id", post.id), post) as model.Post;
	}

	/**
	 * 获取评论
	 * @param id 评论ID
	 */
	async get_comment(id: string) {
		return await this.get(SupportedAPI.COMMUNITY_COMMENT.replace(":id", id));
	}

	/**
	 * 更新评论, 只能更新自己发表的评论, 否则抛出异常
	 * @param comment 修改后的文章对象
	 */
	async update_comment(comment: model.Comment) {
		return await this.post(SupportedAPI.COMMUNITY_COMMENT.replace(":id", comment.id), comment) as model.Comment;
	}

	/**
	 * 删除帖子, 只能更新自己发表的帖子, 管理员可以删除所有人的帖子 否则抛出异常
	 * @param id 帖子ID
	 */
	async delete_post(id: string) {
		return await this.post(SupportedAPI.COMMUNITY_DELETE_POST.replace(":id", id));
	}

	/**
	 * 删除评论, 只能更新自己发表的评论, 管理员可以删除所有人的评论 否则抛出异常
	 * @param id 评论ID
	 */
	async delete_comment(id: string) {
		return await this.post(SupportedAPI.COMMUNITY_DELETE_COMMENT.replace(":id", id));
	}
};

let server: Server = null;
if (!server) {
	server = new Server(config.api);
}
export default server;
