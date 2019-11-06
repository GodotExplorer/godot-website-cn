import * as React from 'react';
import { RouterIndex, history } from 'types/app';
import { Link, RouteProps } from 'react-router-dom';
import server from 'server/server';
import { message, Divider, Card, Button, Tag, Icon, Spin, Pagination } from 'antd';
import * as queryString from 'query-string';
import moment = require('moment');
import { Loading } from 'views/components/Loading';

import "./styles.css"

export namespace CommunityPage {
	export interface Props extends RouteProps {
		page?: number;
		page_size?: number;
	}
	export interface State {
		posts: model.PostSeed[],
		loading: boolean;
		count: number;
	}
}

export default class CommunityPage extends React.Component < CommunityPage.Props, CommunityPage.State > {

	defaultQueryParams = {
		page: 1,
		page_size: 15,
	}

	constructor(props: CommunityPage.Props) {
		super(props);
		this.state = {
			posts: [],
			loading: false,
			count: 0,
		};
	}

	componentDidMount() {
		this.load_data();
	}

	async load_data(params?: {page: number, page_size: number}) {
		let {page, page_size} = params || this.get_page_params();
		this.setState({loading: true});
		try {
			let post_page = await server.get_posts({page, page_size});
			this.setState({
				posts: post_page.posts,
				loading: false,
				count: post_page.count,
			});
		} catch (error) {
			this.setState({loading: false});
			message.error(`获取文章列表失败${error && error.message ? '，' + error.message : ''}`);
		}
	}

	get_page_params() {
		let {page, page_size} = queryString.parse(this.props.location.search);
		return {
			page: parseInt(page as string) || this.defaultQueryParams.page,
			page_size: parseInt(page_size as string) || this.defaultQueryParams.page_size,
		}
	}

	private jump_to_page(page: number, page_size: number) {
		let params = {
			page,
			page_size
		};
		let query = queryString.stringify(params);
		history.push(RouterIndex.COMMUNITY + '?' + query);
		this.load_data(params);
	}

	render() {
		let {page, page_size} = this.get_page_params();
		const title = (
			<div className="posts_header">
				<div style={{display: 'flex', flex: 1}}/>
				<Button type="primary" onClick={()=>history.push(RouterIndex.COMMUNITY_NEW_POST)}>
					<Icon type="edit" />
					发表帖子
				</Button>
			</div>
		);

		return (
			<div className="page-body">
				<Card title={title} bordered={false}>
					{this.state.posts.map((p, i)=>this.render_post_item(p, i))}
					{this.state.loading ? <Loading title="加载中"/> : null}
					<div className="posts_pagination">
						<Pagination
							current={page}
							pageSize={page_size}
							total={this.state.count}
							onChange={this.jump_to_page.bind(this)}
							size="small"
						/>
					</div>
				</Card>
			</div>
		);
	}

	private render_post_item(p: model.PostSeed, index: number) {
		return (
			<div key={index}>
				<h3>
					<Link to={RouterIndex.COMMUNITY_POST.replace(":id", p.id)}>{p.title}</Link>
				</h3>
				<div>
					{p.tags.map(tag=><span key={tag}><Tag>{tag}</Tag></span>)}
					发布于 {moment(p.created_at).fromNow()}
				</div>
				{index < this.state.posts.length - 1 ? <Divider /> : null}
			</div>
		);
	}
}
