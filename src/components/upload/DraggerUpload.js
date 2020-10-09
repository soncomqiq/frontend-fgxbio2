import { InboxOutlined } from "@ant-design/icons";
import { Col, message, notification, Row, Upload } from "antd";
import React from "react";
import { API_BASE_URL } from "../../config/constants";
import LocalStorageService from "../../services/LocalStorageService";

function DraggerUpload(props) {
  const { Dragger } = Upload;
  const { uploadUrl, uploadTopic } = props;

  const uploadProps = {
    name: "file",
    multiple: true,
    action: API_BASE_URL + uploadUrl,
    headers: { Authorization: `Bearer ${LocalStorageService.getToken()}` },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
        if (info?.file?.response.status === 401) {
          LocalStorageService.removeToken();
          window.location.reload();
          notification.error({
            message: "กรุณาเข้าสู่ระบบใหม่",
          });
        }
      }
    },
  };

  return (
    <div>
      <br />
      <Row justify="center">
        <h2>{uploadTopic}</h2>
      </Row>
      <br />
      <Row justify="center">
        <Col span={20}>
          <div>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
              </p>
            </Dragger>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DraggerUpload;
