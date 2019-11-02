import * as React from 'react';
import { Button } from 'antd';

import { Link } from 'react-router-dom'
import MarkdownEditor from 'views/components/Markdown/MarkdownEditor';
import { RouterIndex } from '../../../types/app';

export namespace Home {
	export interface Props extends React.Props < void > {
	}

	export interface State {
	}
}

import "../styles.css"
import FileUploadView from 'views/components/FileUpload/FileUploadView';

export default class Home extends React.Component<Home.Props, Home.State> {

	render() {
		return (
			<div className="page-body">
				<img src="assets/images/logo.svg" alt=""/>
				<Button>
					<Link to={RouterIndex.SIGNUP}>注册</Link>
				</Button>
				<Button>
					<Link to={RouterIndex.SIGNIN}>登录</Link>
				</Button>
				<FileUploadView/>
				<MarkdownEditor />
			</div>
		);
	}
}
