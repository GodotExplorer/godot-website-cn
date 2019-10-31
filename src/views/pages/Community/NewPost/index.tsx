import * as React from 'react';
import server from 'server/server';
import SigninLink from 'views/components/SigninLink';
import { Input, Button, message } from 'antd';
import MarkdownEditor from 'views/components/Markdown/MarkdownEditor';
import TagEditor from './TagEditor';

export namespace NewPost {
  export interface Props extends React.Props < void > {}
  export interface State {}
}

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
				<div>
					<Input ref={this.title_editor} addonBefore="标题" placeholder="请输入标题" onChange={title=>this.setState({title})}/>
					<TagEditor ref={this.tag_editor} />
					<MarkdownEditor ref={this.content_editor as any} />
					<Button onClick={this.submit.bind(this)}>提交</Button>
				</div>
			</div>
		);
	}

	private submit() {
		let tags = this.tag_editor.current.state.tags;
		let content = this.content_editor.current.state.content;
		let title = this.title_editor.current.input.value;
		server.new_post({title, tags: JSON.stringify(tags), content}).then((post: model.Post)=>{
			message.success("文章发表成功");
		}).catch(err=>{
			message.error(`文章发表失败${err && err.message ? ',' + err.message : ''}`);
		});
	}
}
