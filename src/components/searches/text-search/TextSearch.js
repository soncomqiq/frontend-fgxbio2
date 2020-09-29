import React, { useState } from "react";
import { Input, Button, Form, Col, Statistic, Row } from "antd";
import Axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../../../config/constants";
import { Typography } from "antd";
import LocalStorageService from "../../../services/LocalStorageService";

const { Text } = Typography;
const { TextArea } = Input;

function TextSearch(props) {
  const [isClicked, setIsClicked] = useState(false);
  const isAuthenticated = LocalStorageService.getToken();

  const renderSampleList = () => {
    return isAuthenticated && isClicked ? (
      <div>
        {[].map((data) => {
          return (
            <div>
              <Text type="warning">
                Sample Year: {data[0]}, Sample ID: {data[1]}
              </Text>
            </div>
          );
        })}
      </div>
    ) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = [];
        let search = values.search;
        console.log("Received values of form: ", search);
        var tmp = search.replace(/(\r\n|\n|\r)/gm, "$");
        let tmp1 = tmp.split("$");
        let tmp2 = tmp1.map((element) => element.trim()); // trim each string
        tmp2.forEach((element) => {
          let tmp4 = element.split(":");
          let tmp5 = tmp4[1].split(",");
          tmp5.forEach((ele) => {
            data.push({ locus: tmp4[0], allele: ele });
          });
          console.log(data);
        });
        if (this.props.isAuthenticated) {
          const auth = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
            },
          };
          Axios.post(
            API_BASE_URL + "/resources/findpersonbylocus",
            data,
            auth
          ).then((Response) => {
            console.log(Response.data);
            this.setState({
              totalMatchSample: Response.data.length,
              listMatchSample: Response.data,
            });
          });
        } else {
          Axios.post(
            API_BASE_URL + "/resources/findNumberOfPersonByLocus",
            data
          ).then((Response) => {
            console.log(Response.data);
            this.setState({
              totalMatchSample: Response.data,
            });
          });
        }
      }
    });
    setIsClicked(true);
  };

  return (
    <Row>
      <Col xs={24}>
        <Form onFinish={handleSubmit}>
          <Form.Item
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
            <Col span={24} style={{ textAlign: "center" }}>
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
          <Statistic title="Matched Sample" value={0} suffix={"/ " + 5} />
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
