import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouterIndex } from 'types/app';
import "./style.css";
export default class SigninLink extends React.Component {
	public render() {
		return (
			<div className="signin_link">
				请先<Link to={RouterIndex.SIGNIN}>登录</Link>
			</div>
		);
	}
}

