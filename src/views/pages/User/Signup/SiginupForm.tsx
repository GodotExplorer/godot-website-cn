import * as React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import server from 'server/server';
import { RouterIndex } from 'types/app';
const history = createBrowserHistory();

export namespace SignupForm {
  export interface Props extends React.Props<void> {
    form: any,
  }

  export interface State {
    verifyLoading: boolean,
    submitLoading: boolean,
  }
}

class SiginupForm extends React.Component<SignupForm.Props, SignupForm.State> {

  constructor(props) {
    super(props);
    this.state = {
      verifyLoading: false,
      submitLoading: false
    }
  }

  sendVerifyCode = () => {
    const email = this.props.form.getFieldValue("email")
    this.setState({ verifyLoading: true });

    window['server'].request_verify_code({ email }).then(res => {
      message.success(`验证码已发送到${email}，请注意查收`);
      this.setState({ verifyLoading: false });
    }).catch(err => {
      this.setState({ verifyLoading: false });
      message.error(`验证码发送失败，${err.message}`);
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ submitLoading: true });
        server.signup(values).then(res => {
          message.success('注册成功')
          this.setState({ submitLoading: false });
          history.push('/login');
          console.log(res)
        }).catch(err => {
          this.setState({ submitLoading: false });
          message.error(`注册失败，${err.message}`);
        });
      }
    });
  }

  render() {
    const { verifyLoading, submitLoading } = this.state
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
            rules: [{ required: true, message: '邮箱不能为空' }, { type: 'email', message: '邮箱格式不正确', }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码长度为6~80个字符', min: 6, max: 80 }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('verify_code', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(
            <Input
              prefix={<Icon type="code" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入验证码"
            />,
          )}
          <Button style={{ float: 'right' }} loading={verifyLoading} onClick={this.sendVerifyCode}>发送验证码</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitLoading} className="register-form-button">
            注册
          </Button>
          已有账号？ <Link to={RouterIndex.SIGNIN}>登录</Link>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedRegisterForm = Form.create({ name: 'registerForm' })(SiginupForm);

export default WrappedRegisterForm;
