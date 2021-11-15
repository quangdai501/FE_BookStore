import React from "react";
import './style.scss'
const Pagination = () => {
  function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}
  return (
    <div class="pagination">
      <a href="#">&laquo;</a>
     {
         pagination(6,20).map((item,index)=>{
            return(
                <a key={index} className={index==0?"active":""} href="#">{item}</a>
            )
         })
     }
      <a href="#">&raquo;</a>
    </div>
  );
};

export default Pagination;
