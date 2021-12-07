import React, { useEffect, useState } from "react";

import StatisticApi from "../../../../api/statisticApi";
import SimpleBarChart from "./Item/SimpleBarChart";
import SimpleLineChart from "./Item/SimpleLineChart";

import "./style.scss";

const Chart = () => {
  const [currOption, setCurrOption] = useState({by:'day-of-week'})
  const [revenue,setRevenue]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRevenue = await StatisticApi.getRevenue(currOption)
        setRevenue(resRevenue.data);
      } catch (error) {
        console.log(error)
      }
     
    };
    fetchData();
  }, [currOption])

  const sortBy = (e) => {
    setCurrOption({by:e.target.value})
  };
  return (
    <div className="chart">
      <div className="card">
        <div className="chart__header">
          <select name="by" onChange={sortBy} value={currOption.by}>
            <option value="day-of-week">Thống kê theo: Ngày trong tuần</option>
            <option value="day-of-month">Thống kê theo: Ngày trong tháng</option>
            <option value="month-of-year">Thống kê theo: Tháng trong năm</option>
          </select>
        </div>
        <SimpleBarChart rawData={revenue} title={'Thống kê doanh thu'} label={'Doanh thu'}/>
      </div>
      <div className="card">
        <div className="chart__header">
          <select name="by" onChange={sortBy} value={currOption.by}>
            <option value="day-of-week">Thống kê theo: Ngày trong tuần</option>
            <option value="day-of-month">Thống kê theo: Ngày trong tháng</option>
            <option value="month-of-year">Thống kê theo: Tháng trong năm</option>
          </select>
        </div>
        <SimpleLineChart rawData={revenue} title={'Thống kê doanh thu'} label={"Số lượng sản phẩm bán được"}/>
      </div>
    </div>
  );
};

export default Chart;
