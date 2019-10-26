import * as React from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import FormPage from 'views/components/FormPage';
import { Validators, is_email_address } from 'utils';
import server from 'server/server';
import VerifyCode from 'views/components/FormPage/VerifyCode';

interface UserFormProps extends FormComponentProps {
	email: string;
}

interface State {
	confirm_dirty: boolean,
	submit_loading: boolean,
}

export class PasswordRestForm extends React.Component<FormComponentProps, State> {

	constructor(props: UserFormProps) {
		super(props);
		this.state = {
			confirm_dirty: false,
			submit_loading: false,
		}
	}

	validateToNextPassword(rule, value, callback) {
		const { form } = this.props;
		if (value && this.state.confirm_dirty) {
			form.validateFields(['password_confirm'], { force: true });
		}
		this.common_validator(rule, value, callback);
	};

	common_validator(rule, value, callback) {
		if (Validators[rule.type]) {
			callback(Validators[rule.type](value));
		} else {
			callback();
		}
	}

	handleConfirmBlur(e) {
		const { value } = e.target;
		this.setState({ confirm_dirty: this.state.confirm_dirty || !!value });
	}

	compareToFirstPassword(rule, value, callback) {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('两次输入的密码不一致');
		} else {
			this.common_validator(rule, value, callback);
		}
	};

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ submit_loading: true });
				server.reset_password(values).then(res => {
					message.success('密码修改成功')
					this.setState({ submit_loading: false });
				}).catch(err => {
					this.setState({ submit_loading: false });
					message.error(`密码修改失败${err.message}`);
				});
			}
		});
	}


	public render() {
		const icon_style = { color: 'rgba(0,0,0,.25)' };
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<Form.Item hasFeedback>
					{getFieldDecorator('email', {
						rules: [
							{
								type: 'email',
								message: '请输入有效的邮箱地址',
								required: true,
							},
						],
					})(<Input prefix={<Icon type="mail" style={icon_style} />} placeholder="请输入邮箱"/>)}
				</Form.Item>
				<Form.Item hasFeedback>
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: '请输入密码',
							},
							{
								type: 'password',
								validator: this.validateToNextPassword.bind(this),
							},
						],
					})(<Input.Password prefix={<Icon type="lock" style={icon_style} />} type="password" placeholder="请输入密码"/>)}
				</Form.Item>
				<Form.Item hasFeedback>
					{getFieldDecorator('password_confirm', {
						rules: [
							{
								required: true,
								message: '请确认密码',
							},
							{
								type: 'password',
								validator: this.compareToFirstPassword.bind(this),
							},
						],
					})(<Input.Password prefix={<Icon type="lock" style={icon_style} />} type="password" placeholder="密码确认" onBlur={this.handleConfirmBlur.bind(this)} />)}
				</Form.Item>
				<VerifyCode form={this.props.form} get_email={()=>this.props.form.getFieldValue('email')}/>
				<Form.Item>
					<Button type="primary" loading={this.state.submit_loading} style={{width: '100%'}} htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const WrappedPasswordRestForm = Form.create({ name: 'password_reset' })(PasswordRestForm);

export default class PasswordRest extends React.PureComponent {
	public render() {
		return (
			<FormPage title="重置密码">
				<WrappedPasswordRestForm/>
			</FormPage>
		);
	}
}

