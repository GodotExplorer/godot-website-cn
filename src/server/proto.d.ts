/** 数据模型 */
declare namespace model {

	/** 数据模型类 */
	interface DataModel {
		/** 唯一ID */
		id: string;
		/** 创建时间 */
		created_at: Date;
		/** 修改时间 */
		updated_at: Date;
	}

	/** 用户数据 */
	interface User extends DataModel {
		/** 用户名 */
		name: string;
		/** 昵称 */
		nick: string;
		/** 头像 */
		avatar: string;
		/** 简介 */
		description: string;
	}

	/** 文章索引 */
	interface PostSeed extends DataModel {
		/** 标题 */
		title: string;
		/** 发布者 ID */
		publisher: string;
		/** 标签 */
		tags: string[];
	}

	/** 文章列表 */
	interface PostsPage {
		posts: PostSeed[];
		count: number;
	}

	interface Post extends PostSeed {
		/** 内容 */
		content: string;
	}

	/** 评论 */
	interface Comment extends DataModel {
		/** 内容 */
		content: string;

		/** 发布者 ID */
		publisher: string;

		/** 评论目标ID */
		target: string;
	}
}

declare namespace API {

	interface VerifyCodeRequestParam {
		/** 请求验证的邮箱地址 */
		email?: string;
		/** 请求验证的手机号 */
		mobile_phone?: string;
	}

	/** 用户注册参数 */
	interface SignupParam {
		name: string;
		password: string;
		email?: string;
		mobile_phone?: string;
		verify_code: string;
	}

	interface SigninParam {
		name?: string;
		email?: string;
		mobile_phone?: string;
		password: string;
	}

	interface ResetPasswordParam {
		email?: string;
		mobile_phone?: string;
		password: string;
		verify_code: string;
	}

	interface SetProfileParam {
		nick: string,
		avatar: string,
		description: string,
	}

	interface ListPostsParam {
		page?: number;
		page_size?: number;
	}

	interface ListCommentsParam {
		target: string;
		page?: number;
		page_size?: number;
	}

	interface NewPostParam {
		title: string;
		tags: string;
		content: string;
	}

	/** 用户登陆凭证 */
	interface LoginToken {
		id: string;
		name: string;
		token: string;
	}

	interface JWTPayload {
		expire: number,
		data: { id: string, name: string}
	}

}
