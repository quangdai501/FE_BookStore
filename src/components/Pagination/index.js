import React from "react";
import { useLocation, useNavigate } from "react-router";
import './style.scss'
const Pagination = (props) => {
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
const location = useLocation();
const navigate = useNavigate();
const query=props.query
const direct=()=>{
    const params = new URLSearchParams(query);
    navigate({
        pathname: location.pathname,
        search:params.toString() 
    });
}
const changePage=(page)=>{
    if (page!=='...'){
        query.page=page
        direct()
    }
}
const nextPage=(operator)=>{
    let curPage=props.page?props.page:1
    curPage+=operator
    if (curPage>=1&&curPage<=props.pages){
        query.page=curPage
        direct()
    }
}
  return (
    <div class="pagination">
     
      <span onClick={()=>nextPage(-1)} >&laquo;</span>

     {
         pagination(props.page,props.pages).map((item,index)=>{
            return(
                <span onClick={()=>changePage(item)} key={index} className={item===props.page?"active":""} >{item}</span>
            )
         })
     }
      <span onClick={()=>nextPage(+1)} >&raquo;</span>

    </div>
  );
};

export default Pagination;
