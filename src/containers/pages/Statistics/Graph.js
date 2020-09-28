import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { Col, Radio, Row, Select } from "antd";
import "./Graph.css";

const { Option } = Select;

function Graph() {
  const [currentChromosome, setCurrentChromosome] = useState("a");
  const [currentLocus, setCurrentLocus] = useState("Amelogenin");
  const [locusList, setLocusList] = useState({ a: [], x: [], y: [] });

  useEffect(() => {
    axios
      .get("/loci/all")
      .then((res) => {
        setLocusList({
          a: res.data.akits,
          x: res.data.xkits,
          y: res.data.ykits,
        });
      }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchChartData = () => {

  };

  const onChangeCurrentList = (e) => {
    setCurrentLocus(e.target.value);
  };

  const currentlocusList = locusList[currentChromosome].map((locus, idx) =>
    <Row key={idx} type="flex" justify="start" align="top">
      <Radio className="locus-radio" value={locus}>{locus}</Radio>
    </Row>
  );

  return (
    <Row style={{ marginTop: "20px", marginLeft: "20px" }}>
      <Col xs={6}>
        <Row style={{ minWidth: "120px", maxWidth: "240px" }} justify="start" align="middle">
          <Select style={{ width: "100%" }} value={currentChromosome} onChange={(value) => setCurrentChromosome(value)}>
            <Option value="a">Autosomal</Option>
            <Option value="x">X STRs</Option>
            <Option value="y">Y STRs</Option>
          </Select>
        </Row>
        <Row style={{ minWidth: "120px", maxWidth: "240px", marginTop: "10px" }} justify="center" align="middle">
          <Radio.Group onChange={onChangeCurrentList} value={currentLocus}>
            {currentlocusList}
          </Radio.Group>
        </Row>
      </Col>
      <Col xs={18}>
        {/* <LocusStatisticInfo
          locus={this.state.locus}
          alleleCount={this.state.alleleCount}
          heteroSummary={this.state.dataSummary}
        /> */}
      </Col>
    </Row>
  );
}

export default Graph;