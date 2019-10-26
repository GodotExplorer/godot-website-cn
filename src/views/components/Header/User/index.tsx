import * as React from 'react';
import { Avatar, Menu, Dropdown, Icon, message } from 'antd';
import server, { Events } from 'server/server';
import { Link } from 'react-router-dom';
import { RouterIndex } from 'types/app';
import SubMenu from 'antd/lib/menu/SubMenu';

export interface IUserMenuProps {
}

export interface IUserMenuState {
	user: model.User;
}

export default class UserMenu extends React.Component<IUserMenuProps, IUserMenuState> {
	constructor(props: IUserMenuProps) {
		super(props);

		this.state = {
			user: server.user,
		}
		server.on(Events.USER_LOGIN_STATE_CHANGED, null, ()=>{
			this.setState({user: server.user});
		});
	}

	public render() {
		const {avatar, name} = this.state.user || {};

		const title = (
			<div>
				<Avatar src={avatar}>
					{avatar ? <Icon style={{margin: 3}} type="user"/> : null}
				</Avatar>
				<span style={{marginLeft: 3}}>
					{name}
				</span>
			</div>);

		const unsignd = [

		];

		return (
			  <Menu mode="horizontal" style={{width: '100%', textAlign: 'center'}}>
				<SubMenu title={title}>
					{this.state.user ? [
						<Menu.Item key={0}>
							<Link to={RouterIndex.PROFILE}>
								<Icon type="user" />
								个人中心
							</Link>
						</Menu.Item>,
						<Menu.Item key={1}>
							<a onClick={()=>{
								server.signout();
								message.success("您已注销登陆");
							}}>
								<Icon type="logout" />
								注销
							</a>
						</Menu.Item>
					]: [
						<Menu.Item key={0}>
							<Link to={RouterIndex.SIGNIN}>
								<Icon type="login" />
								登陆
							</Link>
						</Menu.Item>,
						<Menu.Item key={1}>
							<Link to={RouterIndex.SIGNUP}>
								<Icon type="user-add" />
								注册
							</Link>
						</Menu.Item>
					]}
        </SubMenu>
      </Menu>
		);
	}
}

