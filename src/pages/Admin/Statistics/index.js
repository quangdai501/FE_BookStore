
import Chart from "./Chart";
import "./style.scss";
import Table from "./Table";
import Total from "./Total";

const Statistics = () => {
 
  return (
    <div className="statistics">
        <Total/>
        <Chart/>
        <Table/>
    </div>
  );
};

export default Statistics;
