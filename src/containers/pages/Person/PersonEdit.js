import { Form, Input, InputNumber } from "antd";
import React, { useState } from "react";

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
    </Form>
  );
}

export default PersonEditForm;
