import { Col, message, Row, Statistic, Typography, Upload } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Dragger } = Upload;

function ExcelSearch() {
  const [isClicked, setIsClicked] = useState(false);
  const [matchedSample, setMatchedSample] = useState({
    amount: 0,
    list: [],
    total: 0,
  });

  const renderSampleList = () => {
    return isClicked ? (
      <div>
        {matchedSample.list.map(({ sampleId, sampleYear }) => {
          return (
            <div>
              <Text style={{ color: "blueviolet" }}>
                Sample Year: {sampleYear}, Sample ID: {sampleId}
              </Text>
            </div>
          );
        })}
        <br />
      </div>
    ) : null;
  };

  const propsDrag = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Col>
        <Row>
          <Dragger {...propsDrag}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
            </p>
          </Dragger>
        </Row>
        <Row justify="center">
          <div>
            <Statistic title="Matched Sample" value={matchedSample.amount} suffix={"/ " + matchedSample.total} />
            <br />
            {renderSampleList()}
          </div>
        </Row>
      </Col>
    </div>
  );
}

export default ExcelSearch;
