import { Divider, Modal } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from "@ant-design/icons";
import axios from '../../../config/axios';

function PersonItem(props) {
  const [visible, setVisible] = useState(false);
  const { person, fetchPerson } = props;

  const onClickDelete = () => {
    console.log("object");
    const config = {
      title: <h4>Are you sure to delete <b>{person.firstname} {person.lastname}(ID: {person.id})</b> ?</h4>,
      okText: "Delete",
      okType: "danger",
      maskClosable: true,
      icon: <DeleteOutlined style={{ color: "red" }} />,
      onOk: () => {
        axios.delete(`/persons/${person.id}`)
          .then(() => {
            fetchPerson();
          });
      },
    };
    Modal.confirm(config);
  };

  return (
    <span>
      <Link to={`/persons/${person.id}/forenseq`}>View</Link>
      <Divider type="vertical" />
      <Link to={`/persons/${person.id}`}>Edit</Link>
      <Divider type="vertical" />
      <Link onClick={onClickDelete}>Delete</Link>
      <Modal
        title="Modal"
        visible={visible}
        onOk={() => this.handleOk(person.sampleId, person.sampleYear)}
        onCancel={() => this.handleCancel(person.sampleId)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure to delete the whole data of Sample ID : {person.sampleId} / Sample Year :{" "}
          {person.sampleYear}
        </p>
      </Modal>
    </span>
  );
}

export default PersonItem;
