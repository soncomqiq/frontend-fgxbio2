import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import axios from "../../../config/axios";

const { Option } = Select;

function PersonEditForm(props) {
  const { id } = useParams();
  const [form] = Form.useForm();

  const [provinceId, setProvinceId] = useState(0);
  const [provinceList, setProvinceList] = useState([]);
  const [raceId, setRaceId] = useState(0);
  const [raceList, setRaceList] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [regionId, setRegionId] = useState(0);
  const [regionList, setRegionList] = useState([]);

  useEffect(() => {
    axios.get(`/persons/${id}`).then((res) => {
      const {
        firstname,
        lastname,
        gender,
        age,
        race: { id: raceId, race },
        country: { id: countryId, country },
        region: { id: regionId, region },
        province: { id: provinceId, province },
      } = res.data;
      form.setFieldsValue({
        firstname,
        lastname,
        gender,
        age,
        race,
        country,
        region,
        province,
      });
      setCountryId(countryId);
      setProvinceId(provinceId);
      setRaceId(raceId);
      setRegionId(regionId);
    });
    axios.get("/countries/").then((res) => {
      setCountryList(res.data);
    });
    axios.get("/races/").then((res) => {
      setRaceList(res.data);
    });
  }, [form, id]);

  useEffect(() => {
    axios.get(`/regions/?country_id=${countryId}`).then((res) => {
      setRegionList(res.data);
    });
  }, [countryId, form]);

  useEffect(() => {
    axios.get(`/provinces/?region_id=${regionId}`).then((res) => {
      setProvinceList(res.data);
    });
  }, [form, regionId]);

  const onFinish = ({ firstname, lastname, gender, age }) => {
    const updatePerson = {
      firstname,
      lastname,
      gender,
      age,
      race_id: raceId,
      country_id: countryId,
      province_id: provinceId,
      region_id: regionId,
    };
    axios.put(`/persons/${id}`, updatePerson).then((res) => {
      props.history.push("/persons");
    });
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
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select placeholder="Select gender">
              <Option value="MALE">MALE</Option>
              <Option value="FEMALE">FEMALE</Option>
            </Select>
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
            <Select placeholder="Please select country" onChange={(id) => setCountryId(id)}>
              {countryList.map(({ id, country }) => (
                <Option value={id}>{country}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="region" label="Region" rules={[{ required: true, message: "Please select region" }]}>
            <Select placeholder="Please select region" onChange={(id) => setRegionId(id)}>
              {regionList.map(({ id, region }) => (
                <Option value={id}>{region}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="province" label="Province" rules={[{ required: true, message: "Please select province" }]}>
            <Select placeholder="Please select province" onChange={(id) => setProvinceId(id)}>
              {provinceList.map(({ id, province }) => (
                <Option value={id}>{province}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="race" label="Race" rules={[{ required: true, message: "Please select race" }]}>
            <Select placeholder="Please select race" onChange={(id) => setRaceId(id)}>
              {raceList.map(({ id, race }) => (
                <Option value={id}>{race}</Option>
              ))}
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

export default withRouter(PersonEditForm);
