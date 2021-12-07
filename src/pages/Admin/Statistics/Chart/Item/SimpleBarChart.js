import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { options } from './untils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function SimpleBarChart(props) {
    const {rawData,label,title}=props
    const opt=options({title:title})
    const labels = rawData.map((item)=>item.label)
    const datas=rawData.map((item)=>item.total)
    const data = {
        labels,
        datasets: [
            {
            label: label,
            data: datas,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Bar  options={opt} data={data} />
    )
}

export default SimpleBarChart
