import React, { useState } from "react";
import { Input, Button, Form, Col, Statistic, Row } from "antd";
import axios from "axios";
import { Typography } from "antd";

const { Text } = Typography;
const { TextArea } = Input;

function TextSearch(props) {
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
              <Text style={{color: "blueviolet"}}>
                Sample Year: {sampleYear}, Sample ID: {sampleId}
              </Text>
            </div>
          );
        })}
        <br />
      </div>
    ) : null;
  };

  const extractLocusAllele = (values) => {
    let data = [];
    let tmp = values.search.replace(/(\r\n|\n|\r)/gm, "$");
    let tmp1 = tmp.split("$");
    let tmp2 = tmp1.map((e) => e.trim());

    tmp2.forEach((e) => {
      let tmp4 = e.split(":");
      let tmp5 = tmp4[1].split(",");
      tmp5.forEach((ele) => {
        data.push({ locus: tmp4[0], allele: ele });
      });
    });

    return data;
  };

  const handleSubmit = async (values) => {
    let data = extractLocusAllele(values);

    axios.post("/samples/person", data).then((res) => {
      setMatchedSample({
        amount: res.data.amount,
        list: res.data.sampleDetails,
        total: res.data.total,
      });
    });

    setIsClicked(true);
  };

  return (
    <Row>
      <Col xs={24}>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="search"
            rules={[
              {
                required: true,
                message: "Please input your text search!",
              },
            ]}
          >
            <TextArea placeholder="CSF1PO:5,6" autosize />
          </Form.Item>
          <Form.Item>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() => props.setExample("")}
              >
                Clear
              </Button>
            </Col>
          </Form.Item>
        </Form>
        <div>
          <Statistic
            title="Matched Sample"
            value={matchedSample.amount}
            suffix={"/ " + matchedSample.total}
          />
          <br />
          {renderSampleList()}
        </div>
      </Col>
      <Col xs={24}>
        <div className="column">
          <p>
            <strong>The pattern example can be found here</strong>
          </p>
          <hr></hr>
          <p>
            [Locus]:[Allele],[Allele]
            <br />
            [Locus]:[Allele]
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default TextSearch;
