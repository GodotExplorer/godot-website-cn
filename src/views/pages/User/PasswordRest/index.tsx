import * as React from 'react';

export namespace PasswordRest {
  export interface Props extends React.Props < void > {}
  export interface State {}
}

export default class PasswordRest extends React.Component < PasswordRest.Props, PasswordRest.State > {
	render() {
		return (
			<div>
				重置密码
			</div>
		);
	}
}
