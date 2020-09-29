import React from "react";
import { Form, Row, Col, Input, Button } from "antd";
import axios from "axios";
import { ACCESS_TOKEN } from "../../../config/constants";

export default function FormSearch() {
  const [form] = Form.useForm();

  const getFields = () => {
    const count = 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`field-${i}`}
            label={`Field ${i}`}
            rules={[
              {
                required: true,
                message: "Input something!",
              },
            ]}
          >
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      isClicked: true,
    });
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
      let data = [];
      console.log(Object.keys(values));
      let locus = Object.keys(values);
      for (let i = 0; i < locus.length; i++) {
        console.log(values[locus[i]]);
        if (typeof values[locus[i]] !== "undefined") {
          let multi = values[locus[i]].split(",");
          multi.forEach((allele) =>
            data.push({
              locus: `${locus[i]}`,
              allele: `${allele}`,
            })
          );
        }
      }
      if (this.props.isAuthenticated) {
        const auth = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
          },
        };
        axios
          .post("/resources/findpersonbylocus", data, auth)
          .then((Response) => {
            console.log(Response.data);
            this.setState({
              totalMatchSample: Response.data.length,
              listMatchSample: Response.data,
            });
          });
      } else {
        axios
          .post("/resources/findNumberOfPersonByLocus", data)
          .then((Response) => {
            console.log(Response.data);
            this.setState({
              totalMatchSample: Response.data,
            });
          });
      }
    });
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
