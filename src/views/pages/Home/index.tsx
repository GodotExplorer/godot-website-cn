import * as React from 'react';
import { Button } from 'antd';

import { Link } from 'react-router-dom'
import MarkdownEditor from 'views/components/Markdown/MarkdownEditor';

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
				<Button>
					<Link to="/register">注册</Link>
				</Button>
				<Button>
					<Link to="/login">登录</Link>
				</Button>
				<MarkdownEditor />
			</div>
		);
	}
}
