import * as React from 'react';
import server from 'server/server';
import SigninLink from 'views/components/SigninLink';
import { Input, Button, message, Card, Divider } from 'antd';
import MarkdownEditor from 'views/components/Markdown/MarkdownEditor';
import TagEditor from './TagEditor';
import { history, RouterIndex } from 'types/app';

export namespace NewPost {
  export interface Props extends React.Props < void > {}
  export interface State {}
}

import "./styles.css"

export default class NewPost extends React.Component < NewPost.Props, NewPost.State > {
	tag_editor:React.RefObject<TagEditor> = null
	content_editor:React.RefObject<MarkdownEditor> = null
	title_editor:React.RefObject<Input> = null

	constructor(props: NewPost.Props) {
		super(props);
		this.tag_editor = React.createRef<TagEditor>();
		this.content_editor = React.createRef<MarkdownEditor>();
		this.title_editor = React.createRef<Input>();
	}

	public render() {
		if (!server.user) {
			return <SigninLink />
		}

		return (
			<div className="page-body">
				<Card title={<h2>发表文章</h2>} bordered={false}>
					<div className="new_post">
						<Input ref={this.title_editor} addonBefore="标题" placeholder="请输入标题"/>
						<div><span>标签:<TagEditor ref={this.tag_editor} /></span></div>
						<div style={{marginBottom: 10, marginTop: 10}}>
							<MarkdownEditor ref={this.content_editor as any} />
						</div>
						<div style={{display: 'flex'}}>
							<div style={{display: 'flex', flex: 1}}/>
							<Button style={{minWidth: 200}} type="primary" onClick={this.submit.bind(this)}>提交</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	private submit() {
		let tags = this.tag_editor.current.state.tags;
		let content = this.content_editor.current.state.content;
		let title = this.title_editor.current.input.value;
		server.new_post({title, tags: JSON.stringify(tags), content}).then((post: model.Post)=>{
			message.success("文章发表成功");
			history.push(RouterIndex.COMMUNITY_POST.replace(":id", post.id));
		}).catch(err=>{
			message.error(`文章发表失败${err && err.message ? ',' + err.message : ''}`);
		});
	}
}
