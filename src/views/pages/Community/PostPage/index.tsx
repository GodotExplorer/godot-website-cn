import * as React from 'react';
import { RouteProps } from 'react-router-dom';
import server from 'server/server';
import { message } from 'antd';
import MarkdownRenderer from 'views/components/Markdown/MarkdownRenderer';

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
				{this.state.post ? this.render_post(this.state.post): null}
			</div>
		);
	}

	private render_post(post: model.Post) {
		return (
			<div>
				<h1>
					{post.title}
				</h1>
				<p>{this.state.publisher.nick}</p>
				<p>
					{post.tags.map(tag=><span>{tag}</span>)}
				</p>
				<p>发布于{post.created_at}</p>
				<MarkdownRenderer content={post.content}/>
			</div>
		);
	}
}
