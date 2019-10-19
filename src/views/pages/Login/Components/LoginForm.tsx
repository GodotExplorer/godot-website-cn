import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'

export namespace LoginForm {
    export interface Props extends React.Props<void> {
        form: any,
    }

    export interface State {
    }
}

class LoginForm extends React.Component<LoginForm.Props, LoginForm.State> {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                window['server'].signin(values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '用户名/邮箱不能为空' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名 / 邮箱"
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
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我</Checkbox>)}
                    <Link className="login-form-forgot" to="/resetPass">
                        忘记密码
                    </Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    还木有账号？ <Link to="/register">马上注册</Link>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedLoginForm = Form.create({ name: 'loginForm' })(LoginForm);

export default WrappedLoginForm