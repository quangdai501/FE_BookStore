import React, { useState } from "react";
import "./style.scss";
const Widget = () => {
  const categorys = [
    { name: "Tiểu thuyết", description: "" },
    { name: "Truyện ngắn – Tản văn", description: "" },
    { name: "Range - Hiểu Sâu, Biết Rộng Kiểu Gì Cũng Thắng", description: "" },
  ];
  const authors = [
    { name: "Dương Thụy" },
    { name: "Anh Cầm Fact" },
    { name: "Trần Minh Phương Thảo" },
    { name: "David Epstein" },
  ];
  const [category, setCategory] = useState(true);
  const [author, setAuthor] = useState(true);

  const toggleCategory = (e) => {
    e.stopPropagation();
    setCategory(!category);
  };
  const toggleAuthor = (e) => {
    e.stopPropagation();
    setAuthor(!author);
  };
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
   
      <div className="sort-bar row">
        <div className="col lg-12" style={{width:200}}></div>
        <p className="display">Hiển thị 1-12 trong 32 sản phẩm</p>
        <select name="sort" className="sortby">
          <option value="">Sắp xếp theo: Mặc định</option>
          <option value="-createdAt">Sắp xếp theo: Mới nhất</option>
          <option value="-createdAt">Sắp xếp theo: Cũ nhất</option>
          <option value="-price">Sắp xếp theo giá: Từ thấp đến cao</option>
          <option value="price">Sắp xếp theo giá: Từ cao đến thấp</option>
        </select>
        <select name="sort" className="sortby">
          <option value="12">Hiển thị 12</option>
          <option value="5">Hiển thị 5</option>
          <option value="20">Hiển thị 20</option>
        </select>
        <span className="filter" onClick={showSidebar}>
          Bộ lọc <i class="fas fa-filter"></i>
        </span>
      </div>
      <div className={sidebar ? "modal active" : "modal"} onClick={showSidebar}>
        <div className="widget" onClick={(e)=>{e.stopPropagation();}}>
          <div className="category close">
            <div className="category__title">
              <h4>Bộ lọc</h4>
              <div onClick={showSidebar} className="toggle"><i class="fas fa-times"></i></div>
            </div>
          </div>
          <div className="category">
            <div className="category__title">
              <h4>Danh mục</h4>
              <div className="toggle" onClick={toggleCategory}>
                {category ? (
                  <i class="fas fa-plus"></i>
                ) : (
                  <i class="fas fa-minus"></i>
                )}
              </div>
            </div>
            {category === true
              ? categorys.map((item, index) => {
                  return (
                    <div className="category__item">
                      <a key={index} href="#">
                        {item.name}
                      </a>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="category">
            <div className="category__title">
              <h4>Tác giả</h4>
              <div className="toggle" onClick={toggleAuthor}>
                {author ? (
                  <i class="fas fa-plus"></i>
                ) : (
                  <i class="fas fa-minus"></i>
                )}
              </div>
            </div>
            {author === true
              ? authors.map((item, index) => {
                  return (
                    <div className="category__item">
                      <a key={index} href="#">
                        {item.name}
                      </a>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;
