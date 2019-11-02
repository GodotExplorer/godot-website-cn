import * as React from 'react';
import { RouteProps, Link } from 'react-router-dom';
import server from 'server/server';
import { message, Card, Tag } from 'antd';
import MarkdownRenderer from 'views/components/Markdown/MarkdownRenderer';
import moment = require('moment');
import { RouterIndex } from 'types/app';
import { Loading } from 'views/components/Loading';

export namespace PostPage {
	export interface Props extends RouteProps {
	}
	export interface State {
		post: model.Post,
		publisher: model.User,
		loading: boolean,
	}
}

export default class PostPage extends React.Component < PostPage.Props, PostPage.State > {

	constructor(props: PostPage.Props) {
		super(props);
		this.state = {
			post: null,
			publisher: null,
			loading: false,
		};
	}

	componentDidMount() {
		this.load_data();
	}

	async load_data() {
		let parts = this.props.location.pathname.split("/");
		let id: string = parts[parts.length -1];
		this.setState({loading: true});
		try {
			let post = await server.get_post(id);
			let publisher = await server.get_user_info(post.publisher);
			this.setState({post, publisher, loading: false});
		} catch (error) {
			message.error(`加载文章出错${error && error.message ? '，' + error.message : ''}`);
			this.setState({loading: false});
		}
	}

	render() {
		return (
			<div className="page-body">
				{this.state.loading ? <Loading title="加载中" /> : null}
				{this.state.post ? this.render_post(this.state.post): null}
			</div>
		);
	}

	private render_post(post: model.Post) {

		const header = (
			<div>
				<h2>{post.title}</h2>
				<div>
					{post.tags.map(tag=><span key={tag}><Tag>{tag}</Tag></span>)}
				</div>
				<small>
					由<Link to={RouterIndex.COMMUNITY_USER_INFO.replace(":id", this.state.publisher.name)}>{this.state.publisher.nick}</Link>发布于{moment(post.created_at).fromNow()}
				</small>
			</div>
		);

		return (
				<Card title={header} bordered={false} >
					<MarkdownRenderer content={post.content}/>
				</Card>
		);
	}
}
