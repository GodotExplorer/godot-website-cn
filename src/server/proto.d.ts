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
	}
}

