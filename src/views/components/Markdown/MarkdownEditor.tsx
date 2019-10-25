import * as React from "react"
import ReactMde from "../../../thirdpart/react-mde";
import "../../../thirdpart/react-mde/styles/react-mde-all.css";
import { async_render_markdown } from "./MarkdownRenderer";
import MarkdownInstuction from "./MarkdownInstuction.md";

export namespace MarkdownEditor {
	export interface Props extends React.Props < void > {
	}
	export interface State {
		content: string;
		tab: 'write' | 'preview' | 'help'
	}
}

export default class MarkdownEditor extends React.Component<MarkdownEditor.Props, MarkdownEditor.State> {

	state: MarkdownEditor.State = {
		content: '',
		tab: 'write',
	};

	render(){
		return(
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
				generateMarkdownPreview={async_render_markdown}
			/>
		);
	}
}
