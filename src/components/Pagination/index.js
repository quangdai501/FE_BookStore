import React from "react";
import './style.scss'
const Pagination = () => {
  return (
    <div class="pagination">
      <a href="#">&laquo;</a>
     {
         [1,2,3,4,5,6].map((item,index)=>{
            return(
                <a key={index} className={item===2?"active":""} href="#">{item}</a>
            )
         })
     }
      <a href="#">&raquo;</a>
    </div>
  );
};

export default Pagination;
