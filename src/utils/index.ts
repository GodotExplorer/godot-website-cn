/** 检查字符串是否为有效的邮箱地址 */
export function is_email_address(text: string): boolean {
	return text.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) != null;
}

