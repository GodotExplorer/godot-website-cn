import * as React from 'react';
import { Upload, Icon, message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import server from 'server/server';

/** 默认文件大小限制 */
const DEFAULT_FILE_MAX_SIZE = 20;

export namespace FileUploadView {
		export interface Props extends React.Props <void> {
			onUploaded?: (url: string) => void;
			imageOnly?: boolean;
			/** 文件大小上限单位为 MB */
			sizeLimit?: number;
			/** 该文件为私有文件 */
			private?: boolean;
		}
		export interface State {
			uploading: boolean;
			imageUrl: string;
		}
}

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}


export default class FileUploadView extends React.Component < FileUploadView.Props, FileUploadView.State > {

		constructor(props: FileUploadView.Props) {
				super(props);
				this.state = {
					uploading: false,
					imageUrl: ''
				};
		}

		beforeUpload(file: RcFile) {
			let allow_upload = true;
			if (this.props.imageOnly) {
				allow_upload = allow_upload && (file.type === 'image/jpeg' || file.type === 'image/png');
				if (!allow_upload) message.error('只允许上传图片文件!');
			}

			let max_size = (this.props.sizeLimit || DEFAULT_FILE_MAX_SIZE) ;
			if (file.size > max_size * 1024 * 1024) {
				message.error(`文件必须在${max_size}MB以内!`);
				allow_upload = false;
			}
			return allow_upload;
		}

		handleChange(info: UploadChangeParam) {
			if (info.file.status === 'uploading') {
				this.setState({ uploading: true });
				return;
			}
			if (info.file.status === 'done') {
				getBase64(info.file.originFileObj, (imageUrl: string) =>
					this.setState({
						imageUrl,
						uploading: false,
					}),
				);
			}
		}

		clear() {
			this.setState({
				uploading: false,
				imageUrl: ''
			})
		}

		async upload(file: RcFile) {
			let ret = await server.upload_file(file, !this.props.private);
			let url = server.get_file_url(ret[0], !this.props.private);
			if (this.props.onUploaded) {
				this.props.onUploaded(url);
			}
			return url;
		}

		render() {
			const {imageUrl} = this.state;
			const uploadButton = (
				<div>
					<Icon type={this.state.uploading ? 'loading' : 'plus'} />
					<div className="ant-upload-text">上传</div>
				</div>
			);
			return (
				<Upload
					name="avatar"
					listType="picture-card"
					className="avatar-uploader"
					showUploadList={false}
					action={this.upload.bind(this)}
					beforeUpload={this.beforeUpload.bind(this)}
					onChange={this.handleChange.bind(this)}
				>
					{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
				</Upload>
				);
		}
}
