import React, { useEffect, useState } from "react";
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Radio, Icon, Col, Row, Typography, Select } from "antd";
import axios from "../../../config/axios";
import { HomeOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const cityScale = scaleLinear().domain([0, 6]).range([1, 25]);

function MapStats() {
  const [locusList, setLocusList] = useState({ Autosome: [], X: [], Y: [] });
  const [currentChromosome, setCurrentChromosome] = useState("Autosome");
  const [curLocus, setCurLocus] = useState("");
  const [data, setData] = useState([]);
  const [colorFlag, setColorFlag] = useState({});

  useEffect(() => {
    axios
      .get("/loci/all")
      .then((res) => {
        setLocusList({
          Autosome: res.data.aloci,
          X: res.data.xloci,
          Y: res.data.yloci,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchMapData(curLocus);
  }, [curLocus]);

  const onChangeCurrentList = (e) => {
    setCurLocus(e.target.value);
  };

  const fetchMapData = (locus) => {
    axios.get(`/forenseq-sequences/map?locus=${locus}`).then((res) => {
      setData(res.data);

      let clFlag = {};
      res.data.forEach((allele) => {
        clFlag[allele.allele] = rgb2hex(allele.color);
      });

      setColorFlag(clFlag);
    });
  };

  const rgb2hex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return rgb && rgb.length === 4
      ? "#" +
          ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
      : "";
  };

  const currentlocusList = locusList[currentChromosome].map((locus, idx) => (
    <Row key={idx} type="flex" justify="start" align="top">
      <Radio className="locus-radio" value={locus}>
        {locus}
      </Radio>
    </Row>
  ));

  return (
      <Row style={{ marginTop: "20px", marginLeft: "20px" }}>
        <Col span={6} >
          <Row style={{ minWidth: "120px", maxWidth: "240px" }} justify="start" align="middle">
            <Select
              style={{ width: "100%" }}
              value={currentChromosome}
              onChange={(value) => setCurrentChromosome(value)}
            >
              <Option value="Autosome">Autosomal</Option>
              <Option value="X">X STRs</Option>
              <Option value="Y">Y STRs</Option>
            </Select>
          </Row>
          <Row style={{ minWidth: "120px", maxWidth: "240px", marginTop: "10px" }} justify="center" align="middle">
            <Radio.Group onChange={onChangeCurrentList} value={curLocus}>
              {currentlocusList}
            </Radio.Group>
          </Row>
        </Col>
        <Col span={14}>
          <ComposableMap
            projectionConfig={{
              scale: 3000,
            }}
            width={700}
            height={900}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <ZoomableGroup center={[100, 12.8]}>
              <Geographies geography="/gadm36_THA_1.json">
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#FFFFFF",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#000000",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#EAEAEC"
                      stroke="#D6D6DA"
                    />
                  ))
                }
              </Geographies>
              {data.map(({ province, latitude, longitude, markerOffset, color, count }) => (
                <Marker key={province} coordinates={[longitude, latitude]}>
                  <circle
                      cx={0}
                      cy={0}
                      r={cityScale(count)}
                      fill={color}
                      stroke="#607D8B"
                      strokeWidth="2"
                    />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </Col>
        <Col span={4}>
          <div style={{ textAlign: "left" }}>
            <br />
            <br />
            <br />
            <Text strong>Allele Frequency</Text>
            <br />
            <br />
            {Object.keys(colorFlag).map((key) => (
              <div style={{ textAlign: "left" }}>
                <Text>
                  &nbsp;
                  <HomeOutlined style={{ color: colorFlag[key] }} />
                  &nbsp;&nbsp;<Text style={{ color: "black" }}>{key}</Text>
                </Text>
              </div>
            ))}
          </div>
        </Col>
      </Row>
  );
}

export default MapStats;
