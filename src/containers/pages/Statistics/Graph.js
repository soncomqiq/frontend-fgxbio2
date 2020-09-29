import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { Col, Radio, Row, Select } from "antd";
import "./Graph.css";
import LocusStatisticInfo from "./Locus/LocusStatisticInfo";

const { Option } = Select;

function Graph() {
  const [currentChromosome, setCurrentChromosome] = useState("Autosome");
  const [currentLocus, setCurrentLocus] = useState("Amelogenin");
  const [locusList, setLocusList] = useState({ Autosome: [], X: [], Y: [] });
  const [graphInfo, setGraphInfo] = useState({});

  useEffect(() => {
    axios
      .get("/loci/all")
      .then((res) => {
        setLocusList({
          Autosome: res.data.akits,
          X: res.data.xkits,
          Y: res.data.ykits,
        });
      }
      )
      .catch((err) => {
        console.log(err);
      });

    fetchChartData(currentLocus);
  }, []);

  const fetchChartData = (locus) => {
    axios.get(`/forenseq-sequences/graph?chromosome=${currentChromosome}&locus=${locus}`)
      .then(res => {
        setGraphInfo(res.data);
      });
  };

  const onChangeCurrentList = (e) => {
    fetchChartData(e.target.value);
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
            <Option value="Autosome">Autosomal</Option>
            <Option value="X">X STRs</Option>
            <Option value="Y">Y STRs</Option>
          </Select>
        </Row>
        <Row style={{ minWidth: "120px", maxWidth: "240px", marginTop: "10px" }} justify="center" align="middle">
          <Radio.Group onChange={onChangeCurrentList} value={currentLocus}>
            {currentlocusList}
          </Radio.Group>
        </Row>
      </Col>
      <Col xs={17}>
        <LocusStatisticInfo
          locus={currentLocus}
          graphInfo={graphInfo}
        />
      </Col>
    </Row>
  );
}

export default Graph;