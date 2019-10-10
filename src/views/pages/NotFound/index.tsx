import * as React from 'react';

export namespace NotFound {
  export interface Props extends React.Props < void > {}
  export interface State {}
}

export default class Home extends React.Component < NotFound.Props, NotFound.State > {
	render() {
		return (
			<div>
				404 Page Not Found
			</div>
		);
	}
}
