import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouterIndex } from 'types/app';

export default class LoginLink extends React.Component {
	public render() {
		return (
			<div>
				<Link to={RouterIndex.SIGNIN}>请先登录</Link>
			</div>
		);
	}
}

