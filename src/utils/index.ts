/** 验证通过 */
const VALIDATE_PASS = undefined;

/** 检查字符串是否为有效的邮箱地址 */
export function is_email_address(text: string): boolean {
	if (!text) return false;
	return text.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) != null;
}

/** 验证密码 */
export function validate_password(text: string): string {
	if (!text || !text.trim()) return '密码不可为空';
	if (text.length < 3 || text.length > 40) return '密码长度应为6~80个字符';
	return VALIDATE_PASS;
}

/** 验证用户名 */
export function validate_user_name(text: string): string {
	if (!text.trim().length) return '请输入用户名';
	if (!text.match(/[A-z_0-9]/)) return '用户名应为字母,数字或下划线';
	if (text.match(/\s/)) return '用户名中不得包含空格';
	return VALIDATE_PASS;
}

export function validate_email(text:string): string {
	if (!is_email_address(text)) {
		return "无效的邮箱地址";
	}
	return VALIDATE_PASS;
}

export function validate_verify_code(text:string): string {
	if (!text || !text.trim()) return '验证码不可为空';
	let ret = text.match(/[0-9]+/);
	if (ret && ret[0] == text && text.length == 6) {
		return VALIDATE_PASS;
	}
	return "验证吗应为6位数字";
}


/** 验证器 */
export const Validators = {
	email: validate_email,
	password: validate_password,
	user_name: validate_user_name,
	verify_code: validate_verify_code,
};


export function make_validator(type: string) {
	let error = VALIDATE_PASS;
	return function(rule: any, value: any, callback: any, source?: any, options?: any) {
		if (Validators[type]) {
			error = Validators[type](value);
		}
		callback(error);
	};
}
