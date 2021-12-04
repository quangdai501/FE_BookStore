import "./style.scss";

import React from "react";

const Sortbar = (props) => {
  const sortBy = (e) => {
    const { name, value } = e?.target;
    props.direct(name, value);
  };
  return (
    <div className="sort-bar row">
      <p className="display ml-none" >
        Hiển thị {props.display} trong {props.total} sản phẩm
      </p>
      <select name="sort" className="sortby" onChange={sortBy}>
        <option value="">Sắp xếp theo: Mặc định</option>
        <option value="-createdAt">Sắp xếp theo: Mới nhất</option>
        <option value="createdAt">Sắp xếp theo: Cũ nhất</option>
        <option value="price">Sắp xếp theo giá: Từ thấp đến cao</option>
        <option value="-price">Sắp xếp theo giá: Từ cao đến thấp</option>
      </select>
      <select name="size" className="sortby" onChange={sortBy}>
        <option value="12">Hiển thị 12</option>
        <option value="5">Hiển thị 5</option>
        <option value="20">Hiển thị 20</option>
      </select>
      <span className="filter" onClick={props.showSidebar}>
        Bộ lọc <i class="fas fa-filter"></i>
      </span>
    </div>
  );
};

export default Sortbar;
