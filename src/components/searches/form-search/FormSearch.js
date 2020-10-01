import React, { useEffect, useState } from "react";
import { Form, Row, Col, Input, Button, Select, Statistic, Typography } from "antd";
import axios from "../../../config/axios";
import "./FormSearch.css";

const { Option } = Select;
const { Text } = Typography;

export default function FormSearch() {
  const [kitsList, setKitsList] = useState({ a: [], x: [], y: [] });
  const [currentChro, setCurrentChro] = useState("a");
  const [currentKit, setCurrentKit] = useState("");
  const [currentLociList, setCurrentLociList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [matchedSample, setMatchedSample] = useState({
    amount: 0,
    list: [],
    total: 0,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("/kits/all")
      .then((res) => {
        setKitsList({
          a: res.data.akits,
          x: res.data.xkits,
          y: res.data.ykits,
        });
        setCurrentKit(res.data.akits[0].kit);
        fetchKits(null, null, true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getFields = () => {
    const children = [];

    currentLociList.forEach((locus, idx) => {
      children.push(
        <Col span={6} key={idx}>
          <Form.Item name={locus} label={locus}>
            <Input placeholder="M,N" />
          </Form.Item>
        </Col>
      );
    });

    return children;
  };

  const handleSearch = (values) => {
    let data = [];
    let locus = Object.keys(values);
    for (let i = 0; i < locus.length; i++) {
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

    axios.post("/samples/person", data).then((res) => {
      setMatchedSample({
        amount: res.data.amount,
        list: res.data.sampleDetails,
        total: res.data.total,
      });
    });

    setIsClicked(true);
  };

  const handleChangeChromosome = (value) => {
    const nextKit = kitsList[value][0].kit;

    setCurrentChro(value);
    fetchKits(nextKit, value);
    setCurrentKit(nextKit);
  };

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

  const handleChangeKit = (value) => {
    setCurrentKit(value);
    fetchKits(value);
  };

  const fetchKits = (kit, chro = currentChro, isFirst = false) => {
    if (isFirst) {
      return axios
        .get(`/kits/8/loci`)
        .then((res) => {
          setCurrentLociList(res.data._embedded.loci.map((e) => e.locus));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    const targetKit = kitsList[chro].find((e) => e.kit === kit);
    axios
      .get(`/kits/${targetKit.id}/loci`)
      .then((res) => {
        setCurrentLociList(res.data._embedded.loci.map((e) => e.locus));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const currentkitsList = kitsList[currentChro]?.map(({ kit }, idx) => {
    return (
      <Option key={idx} value={kit}>
        {kit}
      </Option>
    );
  });

  return (
    <Col>
      <Row>
        <Col span={12}>
          <Row className="col-text" justify="start">
            Current chromosome is
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-text" justify="end">
            <Select
              value={currentChro}
              style={{ width: 360 }}
              onChange={handleChangeChromosome}
            >
              <Option value="a">Autosome</Option>
              <Option value="x">X STRs</Option>
              <Option value="y">Y STRs</Option>
            </Select>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row className="col-text" justify="start">
            Current locus is
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-text" justify="end">
            <Select
              value={currentKit}
              style={{ width: 360 }}
              onChange={(kit) => handleChangeKit(kit)}
            >
              {currentkitsList}
            </Select>
          </Row>
        </Col>
      </Row>
      <Row className="col-text">
        <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={handleSearch}
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 10 }}
          colon={false}
          labelAlign="left"
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
      </Row>
      <Row justify="center">
        <div>
          <Statistic
            title="Matched Sample"
            value={matchedSample.amount}
            suffix={"/ " + matchedSample.total}
          />
          <br />
          {renderSampleList()}
        </div>
      </Row>
    </Col>
  );
}
