import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './views/pages/Home';
import NotFound from './views/pages/NotFound';
import Signin from './views/pages/User/Signin';
import Signup from './views/pages/User/Signup';
import 'index.css'
import server from 'server/server';
import config from 'server/config';
import Header from 'views/components/Header';
import Footer from 'views/components/Footer';
import { RouterIndex, HeaderMenus } from 'types/app';
import PasswordRest from 'views/pages/User/PasswordRest';
if (config.mode === "debug" && !window['server']) { window['server'] = server; }

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<Header items={HeaderMenus}/>
		<Switch>
			<Route exact path={RouterIndex.HOME} component={Home} />
			<Route exact path={RouterIndex.SIGNIN} component={Signin} />
			<Route exact path={RouterIndex.SIGNUP} component={Signup} />
			<Route exact path={RouterIndex.PASSWORD_RESET} component={PasswordRest} />
			<Route path="*" component={NotFound}/>
		</Switch>
		<Footer/>
	</Router>,
	document.getElementById('root')
);
