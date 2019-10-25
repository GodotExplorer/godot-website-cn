import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './views/pages/Home';
import NotFound from './views/pages/NotFound';
import Login from './views/pages/Login';
import ResetPass from './views/pages/PasswordRest';
import Register from './views/pages/Register';
import 'index.css'
import server from 'server/server';
import config from 'server/config';
import Header from 'views/components/Header';
import Footer from 'views/components/Footer';
import { RouterIndex, HeaderMenus } from 'types/app';
if (config.mode === "debug" && !window['server']) { window['server'] = server; }

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<Header items={HeaderMenus}/>
		<Switch>
			<Route exact path={RouterIndex.HOME} component={Home} />
			<Route exact path={RouterIndex.SIGNIN} component={Login} />
			<Route exact path={RouterIndex.SIGNUP} component={Register} />
			<Route exact path={RouterIndex.PASSWORD_RESET} component={ResetPass} />
			<Route path="*" component={NotFound}/>
		</Switch>
		<Footer/>
	</Router>,
	document.getElementById('root')
);
