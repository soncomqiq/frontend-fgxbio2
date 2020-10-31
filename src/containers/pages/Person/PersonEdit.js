import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";

const { Option } = Select;

function PersonEditForm(props) {
  const [provinceList, setProvinceList] = useState([]);
  const [raceList, setRaceList] = useState([]);
  const [countryList, setcountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
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
      <Form.Item
        name="country"
        label="Country"
        rules={[{ required: true, message: "Please select country"}]}
      >
        <Select mode="multiple" placeholder="Please select favourite colors">
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
  );
}

export default PersonEditForm;
