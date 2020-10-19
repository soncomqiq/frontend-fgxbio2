import { Form } from 'antd';
import React from 'react';

function PersonEditForm(props) {
  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form
      onFinish={onFinish}
    >
      <Form.Item
        name="firstname"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default PersonEditForm;
