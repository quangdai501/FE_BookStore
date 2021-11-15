import React, { useState } from "react";
import "./style.scss";
const Widget = () => {
  const categorys = [
    { name: "Tiểu thuyết", description: "" },
    { name: "Truyện ngắn – Tản văn", description: "" },
    { name: "Range - Hiểu Sâu, Biết Rộng Kiểu Gì Cũng Thắng", description: "" },
  ];
  const authors=[{'name': 'Dương Thụy'}, {'name': 'Anh Cầm Fact'}, {'name': 'Trần Minh Phương Thảo'}, {'name': 'David Epstein'}]
  const [category, setCategory] = useState(true);
  const [author, setAuthor] = useState(true);

  const toggleCategory = () => setCategory(!category);
  const toggleAuthor = () => setAuthor(!author);
  return (
    <div className="widget">
      <div className="category">
        <div className="category__title">
          <h4>Danh mục</h4>
          <div className="toggle" onClick={toggleCategory}>
            {category ? <i class="fas fa-plus"></i> : <i class="fas fa-minus"></i>}
          </div>
        </div>
        {
           category===true?categorys.map((item, index) => {
                return (
                    <div className="category__item">
                    <a key={index} href="#">
                        {item.name}
                    </a>
                    </div>
                );
                }):""
        }
      </div>
      <div className="category">
        <div className="category__title">
          <h4>Tác giả</h4>
          <div className="toggle" onClick={toggleAuthor}>
            {author ? <i class="fas fa-plus"></i> : <i class="fas fa-minus"></i>}
          </div>
        </div>
        {
           author===true?authors.map((item, index) => {
                return (
                    <div className="category__item">
                    <a key={index} href="#">
                        {item.name}
                    </a>
                    </div>
                );
                }):""
        }
      </div>
      
    </div>
  );
};

export default Widget;
