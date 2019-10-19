import { EventDispatcher } from "events/EventDispatcher";
import axios from 'axios';
import * as base64url from "base64-url";

const USER_TOKEN_STORAGE_NAME = 'user_token';

enum SupportedAPI {
	REQUEST_VERIFY_CODE = '/v1/verify_code/request',
	USER_SIGNUP = '/v1/user/signup',
	USER_SIGNIN = '/v1/user/signin',
	USET_GET_INFO = '/v1/user/:id',
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

	private async post(api: SupportedAPI | string, params?: any) {
		try {
			const ret = await axios.post(`${this.api_url}${api}`, params, );
			return ret.data || ret;
		} catch (error) {
			if (error && error.response) {
				throw error.response.data || error.response;
			}
		}
	}

	private async get(api: SupportedAPI | string, params?: object) {
		try {
			let url: string = `${this.api_url}${api}`;
			const ret = await axios.get(url);
			return ret.data || ret;
		} catch (error) {
			if (error && error.response) {
				throw error.response.data || error.response;
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
		const d = await this.get(SupportedAPI.USET_GET_INFO.replace(':id', id));
		return d;
	}
};

const API_URL = 'http://localhost:3000';
let server: Server = null;
if (!server) {
	server = new Server(API_URL);
	window['server'] = server;
}
export default server;
