import React from "react";
import "./style.scss";
const FilterBar = (props) => {
  return (
    <div className="filter-bar row">
      <p>Bộ lọc:</p>
      {props.query["author"] ? (
        <div className="label">
          <span>Tác giả: {props.query["author"]}</span>{" "}
          <b onClick={() => props.removeFilter("author")}><i class="fas fa-times"></i></b>
        </div>
      ) : (
        ""
      )}
      {props.query["category"] ? (
        <div className="label">
          <span>Danh mục: {props.query["category"]}</span>{" "}
          <b onClick={() => props.removeFilter("category")}><i class="fas fa-times"></i></b>
        </div>
      ) : (
        ""
      )}
      {props.query["search"] ? (
        <div className="label">
          <span>Từ khóa: {props.query["search"]}</span>{" "}
          <b onClick={() => props.removeFilter("search")}><i class="fas fa-times"></i></b>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FilterBar;
