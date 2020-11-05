import { Col, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../config/axios";

const { Option } = Select;

const frCol = [
  {
    title: "Locus",
    dataIndex: "locus",
    key: "locus",
  },
  {
    title: "Genotype",
    dataIndex: "genotype",
    key: "genotype",
  },
  {
    title: "QC Indicator",
    dataIndex: "qc_indicator",
    key: "qc_indicator",
  },
];

const fsrCol = [
  {
    title: "Locus",
    dataIndex: "locus",
    key: "locus",
  },
  {
    title: "Allele",
    dataIndex: "allele",
    key: "allele",
  },
  {
    title: "Sequence",
    dataIndex: "sequence",
    key: "sequence",
  },
  {
    title: "Read count",
    dataIndex: "read_count",
    key: "read_count",
  },
];

function Person() {
  const { id } = useParams();
  const [forenseqPerson, setForenseqPerson] = useState({
    fr_a: [],
    fr_x: [],
    fr_y: [],
    fr_i: [],
    fsr_a: [],
    fsr_x: [],
    fsr_y: [],
    fsr_i: [],
  });
  const [currentPage, setCurrentPage] = useState("A");
  const [forenseqTable, setForenseqTable] = useState([]);
  const [forenseqSeqTable, setForenseqSeqTable] = useState([]);

  useEffect(() => {
    axios
      .get(`/persons/${id}/forenseq`)
      .then((res) => {
        setForenseqPerson(res.data);
        setForenseqTable(res.data.fr_a);
        setForenseqSeqTable(res.data.fsr_a);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (value) => {
    setCurrentPage(value);
    switch (value) {
      case "A":
        setForenseqTable(forenseqPerson.fr_a);
        setForenseqSeqTable(forenseqPerson.fsr_a);
        break;
      case "X":
        setForenseqTable(forenseqPerson.fr_x);
        setForenseqSeqTable(forenseqPerson.fsr_x);
        break;
      case "Y":
        setForenseqTable(forenseqPerson.fr_y);
        setForenseqSeqTable(forenseqPerson.fsr_y);
        break;
      case "I":
        setForenseqTable(forenseqPerson.fr_i);
        setForenseqSeqTable(forenseqPerson.fsr_i);
        break;
      default:
    }
  };

  return (
    <Row justify="center">
      <Col span={22}>
        <Row className="col-text" justify="center">
          <Select value={currentPage} style={{ width: 360 }} onChange={handleChange}>
            <Option value="A">Autosome</Option>
            <Option value="X">X STRs</Option>
            <Option value="Y">Y STRs</Option>
            <Option value="I">iSNPs</Option>
          </Select>
        </Row>
        <Row justify="center">
          <Table dataSource={forenseqTable} columns={frCol} />
        </Row>
        <Row justify="center">
          <Table dataSource={forenseqSeqTable} columns={fsrCol} />
        </Row>
      </Col>
    </Row>
  );
}

export default Person;
