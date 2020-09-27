import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";

function Graph() {
  const [currentChromosome, setCurrentChromosome] = useState("Autosome");
  const [currentLocus, setCurrentLocus] = useState("Amelogenin");
  const [locusList, setLocusList] = useState({});

  useEffect(() => {
    axios
      .get("/loci/all")
      .then((res) =>
        setLocusList({
          a: res.data.aList,
          x: res.data.xList,
          y: res.data.yList,
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div></div>;
}

export default Graph;
