import * as React from 'react';
import './index.styl';

export interface IFormPageProps extends React.Props<void> {
	title: string;
}

export interface IFormPageState {}

export default class FormPage extends React.Component<IFormPageProps, IFormPageState> {

	constructor(props: IFormPageProps) {
		super(props);
		this.state = {}
	}

	public render() {
		return (
			<div className="form_page">
				<h1>{this.props.title}</h1>
				<div className="form">
					{this.props.children}
				</div>
			</div>
		);
	}
}

