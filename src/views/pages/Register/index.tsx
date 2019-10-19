import * as React from 'react';

import RegisterForm from './Components/RegisterForm'

import './index.styl'

export namespace Register {
	export interface Props extends React.Props < void > {
	}

	export interface State {
	}
}

export default class Register extends React.Component<Register.Props, Register.State> {
    render() {
        return (
            <div id="register">
                <h1>注册</h1>
                <RegisterForm />
            </div>
        )
    }
}