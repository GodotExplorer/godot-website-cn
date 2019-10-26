import * as React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Validators, is_email_address, make_validator } from 'utils';
import server from 'server/server';

export interface IVerifyCodeProps {
	form: WrappedFormUtils,
	get_email(): string;
}

interface State {
	verify_loading: boolean,
}

export default class VerifyCode extends React.Component<IVerifyCodeProps, State> {

	constructor(props: IVerifyCodeProps) {
		super(props);
		this.state = {
			verify_loading: false,
		};
	}

	common_validator(rule, value, callback) {
		if (Validators[rule.type]) {
			callback(Validators[rule.type](value));
		} else {
			callback();
		}
	}

	send_verify_code(){
		const email = this.props.get_email();
		if (is_email_address(email)) {
			this.setState({verify_loading: true});
			server.request_verify_code({email}).then(()=>{
				message.success(`验证码已发送到${email}，请注意查收`);
				this.setState({ verify_loading: false });
			}).catch(err=>{
				this.setState({ verify_loading: false });
				message.error(`验证码发送失败，${err.message}`);
			});
		} else {
			message.error("邮箱地址无效!");
		}
	}

	public render() {
		const icon_style = { color: 'rgba(0,0,0,.25)' };
		const { getFieldDecorator } = this.props.form;
		return (
				<Form.Item hasFeedback>
					{getFieldDecorator('verify_code', {
						rules: [{validator: make_validator('verify_code')}],
					})(
						<Input
							prefix={<Icon type="code" style={icon_style} />}
							placeholder="请输入验证码"
						/>,
					)}
					<small>验证您是该账户的注册者</small>
					<Button style={{ float: 'right' }} loading={this.state.verify_loading} onClick={this.send_verify_code.bind(this)}>发送验证码</Button>
				</Form.Item>
		);
	}
}

