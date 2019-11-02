import * as React from 'react';
import { Spin } from 'antd';

export interface ILoadingProps extends React.Props < void > {
	title?: string;
	style?: React.CSSProperties;
}

import './style.css';

export function Loading (props: ILoadingProps) {
	return (
		<div style={props.style} className="loading">
			<Spin size="large" />
			<p>{props.title}</p>
		</div>
	);
}

