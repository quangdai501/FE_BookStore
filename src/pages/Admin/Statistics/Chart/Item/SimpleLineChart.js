import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { options } from './untils';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const scales={scales: {
  y: {
    type: 'linear',
    display: true,
    position: 'left',
  },
  y1: {
    type: 'linear',
    display: true,
    position: 'right',

    // grid line settings
    grid: {
      drawOnChartArea: false, // only want the grid lines for one axis to show up
    },
  }
}}
function SimpleLineChart(props) {
    const {rawData,label,title}=props
    const opt=options({title:title})
    const labels = rawData.map((item)=>item.label)
    const datas=rawData.map((item)=>item.amount)
    const data = {
      labels,
      datasets: [
        {
          label: label,
          data: datas,
          borderColor: 'rgba(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    };
    return (
        <Line options={opt} data={data} />
    )
}

export default SimpleLineChart
