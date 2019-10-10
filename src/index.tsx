import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './views/pages/Home';
import NotFound from './views/pages/NotFound';

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="*" component={NotFound}/>
		</Switch>
	</Router>,
	document.getElementById('root')
);
