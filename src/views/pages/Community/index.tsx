import * as React from 'react';
import { RouterIndex } from 'types/app';
import { Link, RouteProps } from 'react-router-dom';
import server from 'server/server';
import { message } from 'antd';
import * as queryString from 'query-string';

export namespace CommunityPage {
	export interface Props extends RouteProps {
	}
	export interface State {
		posts: model.PostSeed[],
		loading: boolean;
	}
}

export default class CommunityPage extends React.Component < CommunityPage.Props, CommunityPage.State > {

	defaultQueryParams = {
		page: 1,
		page_size: 10,
	}

	constructor(props: CommunityPage.Props) {
		super(props);
		this.state = {
			posts: [],
			loading: false,
		};
	}

	componentDidMount() {
		this.load_data();
	}

	async load_data() {
		let {page, page_size} = queryString.parse(this.props.location.search);
		this.setState({loading: true});
		try {
			let posts = await server.get_posts({
				page: parseInt(page as string) || this.defaultQueryParams.page,
				page_size: parseInt(page_size as string) || this.defaultQueryParams.page_size,
			});
			this.setState({posts, loading: false});
		} catch (error) {
			this.setState({loading: false});
			message.error(`获取文章列表失败${error && error.message ? '，' + error.message : ''}`);
		}
	}

	render() {
		return (
			<div className="page-body">
				<Link to={RouterIndex.COMMUNITY_NEW_POST}>发表帖子</Link>
				<ul>
					{this.state.posts.map(p=>this.render_post_item(p))}
				</ul>
			</div>
		);
	}

	private render_post_item(p: model.PostSeed) {
		return (
			<li key={p.id}>
				<Link to={RouterIndex.COMMUNITY_POST.replace(":id", p.id)}>
					{p.title}
				</Link>
			</li>
		);
	}
}
