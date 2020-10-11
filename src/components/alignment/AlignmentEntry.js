import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Sample Year",
    dataIndex: "sampleYear",
    key: "sampleYear",
  },
  {
    title: "Sample ID",
    dataIndex: "sampleId",
    key: "sampleId",
  },
  {
    title: "Name",
    render: (text, record, index) => <>{maskedAllele(record.sequence, record.patternAlignment)}</>,
  },
  {
    title: "Read count",
    dataIndex: "readCount",
    key: "readCount",
  },
  {
    title: "Pattern alignment",
    dataIndex: "patternAlignment",
    key: "patternAlignment",
  },
];

function maskedAllele(sequence, seqAlign) {
  let AlphaColor = {};
  let AlphaColorSwitch = {};
  const colours = [
    "#5BF13E",
    "#4CD631",
    "#FFB23E",
    "#E0A041",
    "#388BEE",
    "#4C8DDB",
    "#ED493B",
    "#D6554A",
    "#8D28CC",
    "#BB5FF4",
  ];
  console.log(seqAlign);
  if (seqAlign === "No Repeated Data") {
    return <span style={{ backgroundColor: "green" }}>{sequence}</span>;
  } else {
    let alleles = seqAlign.split(" ");
    let pattern = [];
    AlphaColor = {};
    AlphaColorSwitch = {};

    alleles.forEach((allele) => {
      if (allele === "") return;
      if (/\d/.test(allele)) {
        let tmp = allele.split(")");
        let tmp1 = tmp[0].split("(");
        let tmp2 = Object.assign({ pattern: tmp1[1], number: tmp[1] });
        pattern.push(tmp2);
      } else {
        let tmp2 = Object.assign({ pattern: allele, number: 1 });
        pattern.push(tmp2);
      }
    });

    let k = 0;
    let final = [];

    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].number; j++) {
        if (typeof AlphaColor[pattern[i].pattern] === "undefined") {
          AlphaColor[pattern[i].pattern] = colours[k++];
          AlphaColorSwitch[pattern[i].pattern] = colours[k++];
        }
        final.push(pattern[i].pattern);
      }
    }

    if (final.length === 0) {
      return <span style={{ backgroundColor: "#5BF13E"}}>{sequence}</span>;
    }

    return final.map((letter, i) => (
      <span style={{ backgroundColor: AlphaColor[letter] , border: "2px solid #FFFFFF", borderRadius: "5px" }}>{letter}</span>
    ));
  }
}

export default ({ data }) => {
  console.log(data);
  return <Table columns={columns} dataSource={data} />;
};
