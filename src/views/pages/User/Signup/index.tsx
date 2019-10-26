import * as React from 'react';

import SiginupForm from './SiginupForm'

import './index.styl'
import FormPage from 'views/components/FormPage';

export namespace Register {
	export interface Props extends React.Props<void> {
	}

	export interface State {
	}
}

export default class Register extends React.Component<Register.Props, Register.State> {
	render() {
		return (
			<FormPage title="注册">
				<SiginupForm />
			</FormPage>
		)
	}
}


