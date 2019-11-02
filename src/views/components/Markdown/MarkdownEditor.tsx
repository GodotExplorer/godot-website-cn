import * as React from "react"
import ReactMde, { TextState, TextApi } from "../../../thirdpart/react-mde";
import "../../../thirdpart/react-mde/styles/react-mde-all.css";
import { async_render_markdown } from "./MarkdownRenderer";
import MarkdownInstuction from "./MarkdownInstuction.md";
import { getDefaultCommands, imageCommand } from "thirdpart/react-mde/commands";
import { selectWord } from "thirdpart/react-mde/util/MarkdownUtil";
import { Modal, Input } from "antd";
import FileUploadView from "../FileUpload/FileUploadView";
import server from "server/server";

export namespace MarkdownEditor {
	export interface Props extends React.Props < void > {
	}
	export interface State {
		content: string;
		tab: 'write' | 'preview' | 'help';
		uploading_image: boolean;
		uploaded_file_url: string;
	}
}


export default class MarkdownEditor extends React.Component<MarkdownEditor.Props, MarkdownEditor.State> {

	state: MarkdownEditor.State = {
		content: '',
		tab: 'write',
		uploading_image: false,
		uploaded_file_url: '',
	};

	private commands = getDefaultCommands();
	private uploader: React.RefObject<FileUploadView> = null;
	private image_url_editor:React.RefObject<Input> = null;
	private internal_state: TextState = null;
	private internal_api: TextApi = null;

	constructor(props: MarkdownEditor.Props) {
		super(props);
		for (const g of this.commands) {
			for (const c of g.commands) {
				if (c == imageCommand) {
					c.execute = this.on_image_button.bind(this);
				}
			}
		}
		this.uploader = React.createRef<FileUploadView>();
		this.image_url_editor = React.createRef<Input>();

	}

	render(){
		return(
			<div>
				<ReactMde
					l18n={{write: '编辑', preview:'预览', help: "帮助"}}
					value={this.state.content}
					onChange={(value)=> this.setState({content: value})}
					selectedTab={this.state.tab as any}
					helpMarkdown={MarkdownInstuction}
					onTabChange={(tab)=>{
							this.setState({tab});
						}
					}
					commands={this.commands}
					generateMarkdownPreview={async_render_markdown}
				/>
				{this.render_upload_dialog()}
			</div>
		);
	}

	private render_upload_dialog() {
		return (
			<Modal
					title="插入图片"
					visible={this.state.uploading_image}
					onOk={this.on_insert_image.bind(this)}
					onCancel={()=>this.setState({uploading_image: false})}
					okText="确认"
					cancelText="取消"
				>
					<div style={{margin: 'auto'}}>
						<FileUploadView
							ref={this.uploader as any}
							onUploaded={this.on_file_uploaded.bind(this)}
							imageOnly={true}
							sizeLimit={2}
							private={false}
						/>
						<Input ref={this.image_url_editor} addonBefore="地址" placeholder="可以贴入图片地址" />
					</div>
			</Modal>
		);
	}

	private on_image_button(state0: TextState, api: TextApi) {
		this.setState({uploading_image: true, uploaded_file_url: ''});
		this.internal_state = state0;
		this.internal_api = api;
		if (this.uploader.current) {
			this.uploader.current.clear();
		}
		if (this.image_url_editor.current) {
			this.image_url_editor.current.input.value = "";
		}
	}

	private on_insert_image() {
		// Select everything
		const newSelectionRange = selectWord({ text: this.internal_state.text, selection: this.internal_state.selection });
		const state1 = this.internal_api.setSelectionRange(newSelectionRange);
		// Replaces the current selection with the image
		let imageTemplate = state1.selectedText || "https://example.com/your-image.png";
		imageTemplate = this.state.uploaded_file_url || this.image_url_editor.current.input.value;
		this.internal_api.replaceSelection(`![](${imageTemplate})`);
		// Adjust the selection to not contain the **
		this.internal_api.setSelectionRange({
			start: 4 + state1.selection.start,
			end: 4 + state1.selection.start + imageTemplate.length
		});

		this.setState({uploading_image: false});
	}

	private on_file_uploaded(url: string) {
		let uploaded_file_url = server.get_public_file_url(url);
		this.setState({uploaded_file_url});
		this.image_url_editor.current.input.value = uploaded_file_url;
	}

}
