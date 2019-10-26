import * as React from 'react';

import LoginForm from './SigninForm'

import './index.styl'

export namespace Login {
  export interface Props extends React.Props<void> {
  }

  export interface State {
  }
}

export default class Login extends React.Component<Login.Props, Login.State> {
  render() {
    return (
      <div id="login">
        <h1>登录</h1>
        <LoginForm />
      </div>
    )
  }
}
