import { EventDispatcher } from "events/EventDispatcher";
import axios, { AxiosRequestConfig } from 'axios';
import * as base64url from "base64-url";

const USER_TOKEN_STORAGE_NAME = 'user_token';

enum SupportedAPI {
	REQUEST_VERIFY_CODE = '/v1/verify_code/request',
	USER_SIGNUP = '/v1/user/signup',
	USER_SIGNIN = '/v1/user/signin',
	USER_GET_INFO = '/v1/user/:id',
	USER_RESET_PASSWORD = '/v1/user/reset_password',
	FILES_UPLOAD = '/v1/files/upload',
	FILES_GET = '/v1/files/get',
}

export class Server extends EventDispatcher {
	/** API 地址 */
	readonly api_url: string;

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

	/** 获取用户信息 */
	async get_user_info(id: string) {
		const d: model.User = await this.get(SupportedAPI.USER_GET_INFO.replace(':id', id));
		return d;
	}

	/** 重置密码,完成后自动登陆 */
	async reset_password(params: API.ResetPasswordParam) {
		const token: API.LoginToken = await this.post(SupportedAPI.USER_RESET_PASSWORD, params);
		this.token = token;
		return token;
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
};

const API_URL = 'http://localhost:3000';
let server: Server = null;
if (!server) {
	server = new Server(API_URL);
	window['server'] = server;
}
export default server;
