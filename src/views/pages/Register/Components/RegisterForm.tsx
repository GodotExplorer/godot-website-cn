import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'

export namespace RegisterForm {
    export interface Props extends React.Props<void> {
        form: any,
    }

    export interface State {
    }
}

class RegisterForm extends React.Component<RegisterForm.Props, RegisterForm.State> {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                window['server'].signup(values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '用户名不能为空' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '邮箱不能为空' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入邮箱"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        注册
                    </Button>
                    已有账号？ <Link to="/login">登录</Link>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedRegisterForm = Form.create({ name: 'registerForm' })(RegisterForm);

export default WrappedRegisterForm