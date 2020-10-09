import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import AlignmentEntry from "../../../components/alignment/AlignmentEntry";
import axios from "../../../config/axios";

const { Option } = Select;

function SequenceAlignment() {
  const [currentChromosome, setCurrentChromosome] = useState("a");
  const [currentLocus, setCurrentLocus] = useState("Select Locus");
  const [currentAllele, setCurrentAllele] = useState("Select Allele");
  const [locusList, setLocusList] = useState({ a: [], x: [], y: [] });
  const [alleleList, setAlleleList] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get("/loci/all")
      .then((res) => {
        setLocusList({
          a: res.data.aloci,
          x: res.data.xloci,
          y: res.data.yloci,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeLocus = (locus) => {
    setCurrentLocus(locus);
    axios.get(`/samples/allele?locus=${locus}`).then((response) => {
      setAlleleList(response.data);
    });
  };

  const onChangeAllele = (allele) => {
    setCurrentAllele(allele);
    axios.get(`/forenseq-sequences/pattern-alignment?locus=${currentLocus}&allele=${allele}`).then((response) => {
      console.log(response.data);
      setResult(response.data);
    });
  };

  return (
    <div className="container is-fluid">
      <br />
      <p>
        <strong>Please Pick Locus and Allele for Sequence alignment</strong>
      </p>
      <br />
      <div>
        <Row justify="center">
          <Col xs={20} md={12} lg={10} xl={8}>
            <Row>
              <Col span={12}>
                <Row className="col-text" justify="start">
                  Current chromosome is
                </Row>
              </Col>
              <Col span={12}>
                <Row className="col-text" justify="end">
                  <Select
                    value={currentChromosome}
                    style={{ width: 360 }}
                    onChange={(value) => setCurrentChromosome(value)}
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
                  <Select value={currentLocus} style={{ width: 360 }} onChange={(locus) => onChangeLocus(locus)}>
                    {locusList[currentChromosome].map((locus, idx) => (
                      <Option key={idx} className="locus-radio" value={locus}>
                        {locus}
                      </Option>
                    ))}
                  </Select>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Row className="col-text" justify="start">
                  Current allele is
                </Row>
              </Col>
              <Col span={12}>
                <Row className="col-text" justify="end">
                  <Select value={currentAllele} style={{ width: 360 }} onChange={(allele) => onChangeAllele(allele)}>
                    {alleleList.map((allele, idx) => (
                      <Option key={idx} className="locus-radio" value={allele}>
                        {allele}
                      </Option>
                    ))}
                  </Select>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <br />
        <div>
        <AlignmentEntry data={result} />
        </div>
      </div>
    </div>
  );
}

export default SequenceAlignment;
