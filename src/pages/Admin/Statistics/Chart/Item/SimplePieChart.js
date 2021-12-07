import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BorderColors, Colors, options } from './untils';

ChartJS.register(ArcElement, Tooltip, Legend);


function SimplePieChart(props) {
  const {rawData,title}=props
  const opt=options({title:title})
  const labels = rawData.map((item)=>item.label)
  const datas=rawData.map((item)=>item.value)
  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: datas,
        backgroundColor:Colors ,
        borderColor: BorderColors,
        borderWidth: 1,
      },
    ],
  };
    return (
        <Pie  options={opt}  data={data} />
    )
}

export default SimplePieChart
