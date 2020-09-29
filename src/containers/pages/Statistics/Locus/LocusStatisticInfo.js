import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

function LocusStatisticInfo(props) {
  const { locus, graphInfo: { aaList, numberOfHetero, numberOfTotal, numberOfHomo, heterozygocity, homozygocity } } = props;
  let observedAllele = [];
  let alleleAmount = [];

  aaList && aaList.forEach(sample => {
    alleleAmount.push(sample.amount);
    observedAllele.push(sample.allele === "0.0" ? 'Invalid' : sample.allele);
  });
  
  let chartData = {
    labels: observedAllele,
    datasets: [
      {
        label: 'Allele Frequency',
        data: alleleAmount,
        backgroundColor: '#f5222d'
      }
    ]
  };

  return (
    <div>
      <p>
        <strong>Locus : </strong>
        {locus}
      </p>
      <br />
      <p>
        <strong>Observed Allele : </strong>
        {observedAllele.map(sample => (
          <span>{sample} <span />
          </span>
        ))}
      </p>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <p>
          <strong>Summary</strong>
        </p>
        <div key={locus}>
          <br />
          <p>
            <strong>Locus : </strong> {locus} <br />
            <strong>Total Haplotype : </strong>{numberOfTotal} <br />
            <strong>Hetero Haplotype : </strong>{numberOfHetero} <br />
            <strong>Homo Haplotype : </strong>{numberOfHomo}
          </p>
          <br />
          <p>
            <strong>heterozygocity = </strong>
            {heterozygocity?.toFixed(2)}
            &nbsp;&nbsp;
            <strong>homozygocity : </strong>
            {homozygocity?.toFixed(2)}
          </p>
          <br />
          <br />
          <Doughnut
            data={{
              labels: ['Heterozygocity', 'Homozygocity'],
              datasets: [
                {
                  label: 'Amount',
                  data: [
                    heterozygocity,
                    homozygocity
                  ],
                  backgroundColor: ['#fa541c', '#a0d911']
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LocusStatisticInfo;
