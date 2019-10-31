import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch} from 'react-router-dom';
import Home from './views/pages/Home';
import NotFound from './views/pages/NotFound';
import Signin from './views/pages/User/Signin';
import Signup from './views/pages/User/Signup';
import 'index.css'
import server from 'server/server';
import config from 'server/config';
import Header from 'views/components/Header';
import Footer from 'views/components/Footer';
import { RouterIndex, HeaderMenus, history } from 'types/app';
import PasswordRest from 'views/pages/User/PasswordRest';
import NewPost from 'views/pages/Community/NewPost';
import CommunityPage from 'views/pages/Community';
import PostPage from 'views/pages/Community/PostPage';
if (config.mode === "debug" && !window['server']) { window['server'] = server; }



ReactDOM.render(
	<Router history={history}>
		<Header items={HeaderMenus}/>
		<Switch>
				<Route exact path={RouterIndex.HOME} component={Home} />
				<Route exact path={RouterIndex.SIGNIN} component={Signin} />
				<Route exact path={RouterIndex.SIGNUP} component={Signup} />
				<Route exact path={RouterIndex.PASSWORD_RESET} component={PasswordRest} />
				<Route exact path={RouterIndex.COMMUNITY} component={CommunityPage} />
				<Route exact path={RouterIndex.COMMUNITY_NEW_POST} component={NewPost} />
				<Route exact path={RouterIndex.COMMUNITY_POST} component={PostPage} />
				<Route path="*" component={NotFound}/>
		</Switch>
		<Footer/>
	</Router>,
	document.getElementById('root')
);
