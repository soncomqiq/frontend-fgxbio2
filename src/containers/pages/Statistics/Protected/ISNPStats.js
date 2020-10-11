import React, { useEffect, useState } from "react";
import axios from "../../../../config/axios";

function ISNPStats() {
  const [snpSummary, setSnpSummaryList] = useState([]);

  useEffect(() => {
    axios.get("/forenseq-sequences/isnp").then((response) => {
      console.log(response.data);
      let Locus = "";
      let A_Amount = 0;
      let T_Amount = 0;
      let C_Amount = 0;
      let G_Amount = 0;
      let I_Amount = 0;
      let Total_Amount = 0;
      let result = [];

      response.data.forEach((row) => {
        if (row.locus === Locus) {
          switch (row.allele) {
            case "A":
              A_Amount += row.amount;
              break;
            case "T":
              T_Amount += row.amount;
              break;
            case "C":
              C_Amount += row.amount;
              break;
            case "G":
              G_Amount += row.amount;
              break;
            case "I":
              I_Amount += row.amount;
              break;
            default:
              break;
          }
          Total_Amount += row.amount;
        } else {
          result.push({
            Locus: Locus,
            A: A_Amount,
            T: T_Amount,
            C: C_Amount,
            G: G_Amount,
            I: I_Amount,
            Total: Total_Amount,
          });

          Locus = row.locus;
          A_Amount = 0;
          T_Amount = 0;
          C_Amount = 0;
          G_Amount = 0;
          Total_Amount = 0;

          switch (row.allele) {
            case "A":
              A_Amount += row.amount;
              break;
            case "T":
              T_Amount += row.amount;
              break;
            case "C":
              C_Amount += row.amount;
              break;
            case "G":
              G_Amount += row.amount;
              break;
            case "I":
              I_Amount += row.amount;
              break;
            default:
              break;
          }

          Total_Amount += row.amount;
        }
      });

      result.push({
        Locus: Locus,
        A: A_Amount,
        T: T_Amount,
        C: C_Amount,
        G: G_Amount,
        I: I_Amount,
        Total: Total_Amount,
      });

      result.shift();
      setSnpSummaryList(result);
    });
  }, []);

  return (
    <div className="container">
      <br />
      <h2 className="title is-2">
        <strong>iSNP Statistic Summary</strong>
      </h2>
      <br />
      <p>
        <strong>
          The statistic for iSNP data in the database are shown below, each color represent the genotype found in the
          samples.
        </strong>
      </p>
      <br />
      <div className="columns">
        <div align="center" className="column" style={{ backgroundColor: "#bae637" }}>
          <strong>A</strong>
        </div>
        <div align="center" className="column" style={{ backgroundColor: "#69c0ff" }}>
          <strong>T</strong>
        </div>
        <div align="center" className="column" style={{ backgroundColor: "#ffd666" }}>
          <strong>C</strong>
        </div>
        <div align="center" className="column" style={{ backgroundColor: "#ff7a45" }}>
          <strong>G</strong>
        </div>
        <div align="center" className="column" style={{ backgroundColor: "#ffadd2" }}>
          <strong>Un-Identified ( I )</strong>
        </div>
      </div>
      <br />
      <div>
        <div className="columns">
          <div className="column is-2" align="center">
            <strong>Locus</strong>
          </div>
          <div className="column" align="center">
            <strong>Percentage</strong>
          </div>
          <div className="column is-2" align="center">
            <strong>Total Amount</strong>
          </div>
        </div>
      </div>
      {snpSummary.map((entry) => {
        // + 0.5 And Floor Function to round same as math principle
        var a = (entry.A / entry.Total) * 100;
        var t = (entry.T / entry.Total) * 100;
        var c = (entry.C / entry.Total) * 100;
        var g = (entry.G / entry.Total) * 100;
        var i = (entry.I / entry.Total) * 100;
        return (
          <div>
            <br />

            <div className="columns">
              <div className="column is-2" align="center">
                <strong>{entry.Locus}</strong>
              </div>
              <div className="column">
                <div className="columns" style={{ padding: "5px" }}>
                  <div
                    align="center"
                    style={{
                      borderStyle: "solid",
                      borderWidth: a !== 0 ? "0px" : "0px",
                      backgroundColor: "#bae637",
                      width: a < 7 && a > 0 ? "7%" : a + "%",
                      height: 40,
                    }}
                  >
                    {a !== 0 && (
                      <p style={{ margin: "auto", padding: "10px" }}>
                        <strong>{a.toFixed(2)}%</strong>
                      </p>
                    )}
                  </div>
                  <div
                    align="center"
                    style={{
                      borderStyle: "solid",
                      borderWidth: t !== 0 ? "0px" : "0px",
                      backgroundColor: "#69c0ff",
                      width: t < 7 && t > 0 ? "7%" : t + "%",
                      height: 40,
                    }}
                  >
                    {t !== 0 && (
                      <p style={{ margin: "auto", padding: "10px" }}>
                        <strong>{t.toFixed(2)}%</strong>
                      </p>
                    )}
                  </div>
                  <div
                    align="center"
                    style={{
                      borderStyle: "solid",
                      borderWidth: c !== 0 ? "0px" : "0px",
                      backgroundColor: "#ffd666",
                      width: c < 7 && c > 0 ? "7%" : c + "%",
                      height: 40,
                    }}
                  >
                    {c !== 0 && (
                      <p style={{ margin: "auto", padding: "10px" }}>
                        <strong>{c.toFixed(2)}%</strong>
                      </p>
                    )}
                  </div>
                  <div
                    align="center"
                    style={{
                      borderStyle: "solid",
                      borderWidth: g !== 0 ? "0px" : "0px",
                      backgroundColor: "#ff7a45",
                      width: g < 7 && g > 0 ? "7%" : g + "%",
                      height: 40,
                    }}
                  >
                    {g !== 0 && (
                      <p style={{ margin: "auto", padding: "10px" }}>
                        <strong>{g.toFixed(2)}%</strong>
                      </p>
                    )}
                  </div>
                  <div
                    align="center"
                    style={{
                      borderStyle: "solid",
                      borderWidth: i !== 0 ? "0px" : "0px",
                      backgroundColor: "#ffadd2",
                      width: i < 7 && i > 0 ? "7%" : i + "%",
                      height: 40,
                    }}
                  >
                    {i !== 0 && (
                      <p style={{ margin: "auto", padding: "10px" }}>
                        <strong>{i.toFixed(2)}%</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="column is-2" align="center">
                <strong>{entry.Total}</strong>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ISNPStats;
