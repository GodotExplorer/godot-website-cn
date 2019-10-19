import * as React from 'react';
import { Button } from 'antd';
export namespace Home {
	export interface Props extends React.Props < void > {
	}

	export interface State {
	}
}

export default class Home extends React.Component<Home.Props, Home.State> {
	render() {
		return (
			<div>
				<img src="assets/images/logo.svg" alt=""/>
			</div>
		);
	}
}
