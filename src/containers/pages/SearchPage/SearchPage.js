import React, { useState } from "react";

import { Radio } from "antd";
import "./SearchPage.css";
import ExcelSearch from "../../../components/searches/excel-search/ExcelSearch";
import TextSearch from "../../../components/searches/text-search/TextSearch";
import FormSearch from "../../../components/searches/form-search/FormSearch";

export default function SearchPage(props) {
  const [searchMeth, setSearchMeth] = useState(1);
  const [example, setExample] = useState("");

  const handleExample = () => {
    switch (props.searchType) {
      case "Text":
        setExample("D12S391:19,25\nTPOX:8\nD13S317:8");
        break;
      case "Manual":
        setExample({
          D12S391: "19,25",
          TPOX: "8",
          D13S317: "8",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <h2>We provide multiple methods to</h2>
        <h2>compare your sample data with our database</h2>
        <h2 className="click-for-example" onClick={handleExample}>
          Click for example
        </h2>
        <br />
        <br />
        <Radio.Group
          onChange={(e) => {
            setSearchMeth(e.target.value);
            setExample("");
          }}
          defaultValue={1}
        >
          <Radio.Button value={0}>Excel</Radio.Button>
          <Radio.Button value={1}>Text</Radio.Button>
          <Radio.Button value={2}>Manual</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      <div>
        <div className="search-container">
          {(() => {
            switch (searchMeth) {
              case 0:
                return <ExcelSearch />;
              case 1:
                return <TextSearch example={example} setExample={setExample} />;
              case 2:
                return <FormSearch example={example} setExample={setExample} />;
              default:
                return <div>default</div>;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
