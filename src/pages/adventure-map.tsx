/** @jsxImportSource @emotion/react */
import * as React from "react";
import { Descendant } from "slate";
import { RichEditor } from "shared/components";
import { useRegisterTabPage } from "shared/hooks";
import { Modal, Upload, UploadFile } from "antd";
import { RcFile, UploadChangeParam, UploadProps } from "antd/lib/upload";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
interface Props {
  type?: string;
}
export default function AdventureMap({ type }: Props) {
  useRegisterTabPage("探险地图", "/service-hall/adventure-map", type, () => {});
  const [editState, setEditState] = React.useState<Descendant[]>(
    RichEditor.initialValue
  );

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [fileList, setFileList] = React.useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  //预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
    event,
  }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //写法一：
  // const handleDraggerChange:UploadProps["onChange"] = ({
  //   file,
  //   fileList,
  //   event,
  // }) => {
  //    console.log( file.status)
  // };

  //写法二：
  const handleDraggerChange = (info: UploadChangeParam<any>) => {
    console.log(info.file.name);
  };
  const handleDraggerUpload = async (file: File) => {
    console.log(file);
  };

  return (
    <div
      css={{
        height: "100%",
        overflow: "hidden",
        padding: "150px 10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div
        className="upload-section"
        css={{
          flex: 1,
          minHeight: 500,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <div className="common-upload" css={{ flex: 1 }}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
        <div
          className="drag-upload"
          css={{
            flex: 1,
            "& .ant-upload.ant-upload-drag": {
              padding: 20,
            },
          }}
        >
          <Dragger
            css={{}}
            name="file"
            onChange={(info) => handleDraggerChange(info)}
            customRequest={(options) => {
              handleDraggerUpload(options.file as File);
            }}
          >
            <UploadOutlined />
            <div>点击此处或将文件拖至此处上传</div>
          </Dragger>
        </div>
      </div>
      <div className="editor-section" css={{ flex: 1, width: 800 }}>
        <RichEditor
          value={editState}
          onChange={(value) => {
            setEditState(value);
          }}
        />
      </div>
    </div>
  );
}
