import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../config/axios";

const { Option } = Select;

function PersonEditForm(props) {
  const { id } = useParams();
  const [form] = Form.useForm();

  const [provinceList, setProvinceList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [countryList, setcountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);

  useEffect(() => {
    axios.get(`/persons/${id}`).then((res) => {
      console.log(res.data)
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Row justify="center">
      <Col span={20}>
        <Form onFinish={onFinish} form={form} name="edit-form">
          <Form.Item
            label="Firstname"
            name="firstname"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ชื่อจริง",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[
              {
                required: true,
                message: "กรุณาใส่นามสกุล",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: "กรุณาใส่อายุ",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="country" label="Country" rules={[{ required: true, message: "Please select country" }]}>
            <Select mode="multiple" placeholder="Please select country">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <Form.Item name="region" label="Region" rules={[{ required: true, message: "Please select region" }]}>
            <Select mode="multiple" placeholder="Please select region">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <Form.Item name="province" label="Province" rules={[{ required: true, message: "Please select province" }]}>
            <Select mode="multiple" placeholder="Please select province">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <Form.Item name="race" label="Race" rules={[{ required: true, message: "Please select race" }]}>
            <Select mode="multiple" placeholder="Please select race">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default PersonEditForm;
