import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './views/pages/Home';
import NotFound from './views/pages/NotFound';
import Login from './views/pages/Login';
import ResetPass from './views/pages/ResetPass';
import Register from './views/pages/Register';
import Test from 'views/pages/Test';
import 'index.css'
import server from 'server/server';
import config from 'server/config';
if (config.mode === "debug" && !window['server']) { window['server'] = server; }

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/resetPass" component={ResetPass} />
			<Route exact path="/test" component={Test} />
			<Route path="*" component={NotFound}/>
		</Switch>
	</Router>,
	document.getElementById('root')
);
