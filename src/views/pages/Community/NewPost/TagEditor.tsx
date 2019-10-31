import * as React from 'react';
import { Tag, Input, Icon, message } from 'antd';
// import { TweenOneGroup } from 'rc-tween-one';

export default class TagEditor extends React.Component {

	input: any;

	state = {
		tags: ['讨论'],
		inputVisible: false,
		inputValue: '讨论',
	};

	handleClose = removedTag => {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		this.setState({ tags });
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		let { inputValue } = this.state;
		inputValue = inputValue.trim();
		let { tags } = this.state;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		} else {
			if (inputValue) message.error("该标签已存在");
		}
		this.setState({
			tags,
			inputVisible: false,
			inputValue: '',
		});
	};

	saveInputRef = input => (this.input = input);

	forMap = tag => {
		const tagElem = (
			<Tag
				closable
				onClose={e => {
					e.preventDefault();
					this.handleClose(tag);
				}}
			>
				{tag}
			</Tag>
		);
		return (
			<span key={tag} style={{ display: 'inline-block' }}>
				{tagElem}
			</span>
		);
	};

	render() {
		const { tags, inputVisible, inputValue } = this.state;
		const tagChild = tags.map(this.forMap);
		return (
			<div style={{margin: 4, minHeight: 24}}>
					{/* <TweenOneGroup
						enter={{
							scale: 0.8,
							opacity: 0,
							type: 'from',
							duration: 100,
							onComplete: e => {
								e.target.style = '';
							},
						}}
						leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
						appear={false}
					> */}
						{tagChild}
					{/* </TweenOneGroup> */}
					<span>
						{inputVisible && (
						<Input
							ref={this.saveInputRef}
							type="text"
							size="small"
							style={{ width: 78 }}
							value={inputValue}
							onChange={this.handleInputChange}
							onBlur={this.handleInputConfirm}
							onPressEnter={this.handleInputConfirm}
						/>
						)}
						{!inputVisible && (
						<Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
							<Icon type="plus" /> 新标签
						</Tag>
						)}
					</span>
			</div>
		);
	}
}

