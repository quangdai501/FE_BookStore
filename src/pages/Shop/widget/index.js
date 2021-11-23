import React, { useEffect, useState } from "react";
import "./style.scss";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../../actions/authorAction";

const Widget = (props) => {
  const categorys = [
    { name: "Tiểu thuyết", description: "" },
    { name: "Truyện ngắn – Tản văn", description: "" },
    { name: "Range - Hiểu Sâu, Biết Rộng Kiểu Gì Cũng Thắng", description: "" },
  ];
  // const authors = [
  //   { name: "Dương Thụy" },
  //   { name: "Anh Cầm Fact" },
  //   { name: "Trần Minh Phương Thảo" },
  //   { name: "David Epstein" },
  // ];
  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { loading, error, authors } = authorList;

  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState(true);
  const [author, setAuthor] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  let query = props.query;

  useEffect(() => {
    dispatch(listAuthors());
  }, []);

  const direct=(name,value)=>{
    query[name] = value;
    const params = new URLSearchParams(query);
    // console.log(params.toString())
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  }
  const sortBy = (e) => {
    const { name, value } = e?.target;
    direct(name,value)
  };
 
  const toggleCategory = (e) => {
    e.stopPropagation();
    setCategory(!category);
  };
  const toggleAuthor = (e) => {
    e.stopPropagation();
    setAuthor(!author);
  };
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="sort-bar row">
        <div className="col lg-12" style={{ width: 200 }}></div>
        <p className="display">
          Hiển thị {props.display} trong {props.total} sản phẩm
        </p>
        <select name="sort" className="sortby" onChange={sortBy}>
          <option value="">Sắp xếp theo: Mặc định</option>
          <option value="createdAt">Sắp xếp theo: Mới nhất</option>
          <option value="-createdAt">Sắp xếp theo: Cũ nhất</option>
          <option value="price">Sắp xếp theo giá: Từ thấp đến cao</option>
          <option value="-price">Sắp xếp theo giá: Từ cao đến thấp</option>
        </select>
        <select name="size" className="sortby" onChange={sortBy}>
          <option value="12">Hiển thị 12</option>
          <option value="5">Hiển thị 5</option>
          <option value="20">Hiển thị 20</option>
        </select>
        <span className="filter" onClick={showSidebar}>
          Bộ lọc <i class="fas fa-filter"></i>
        </span>
      </div>
      <div className={sidebar ? "modal active" : "modal"} onClick={showSidebar}>
        <div
          className="widget"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="category close">
            <div className="category__title">
              <h4>Bộ lọc</h4>
              <div onClick={showSidebar} className="toggle">
                <i class="fas fa-times"></i>
              </div>
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

            {category === true ? (
              <div className="category__list">
                {categorys.map((item, index) => {
                  return <p key={index}>{item.name}</p>;
                })}
              </div>
            ) : (
              ""
            )}
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
            {author === true ? (
              <div className="category__list">
                {authors.map((item, index) => {
                  return <p name='author' onClick={()=>direct("author",item._id)} key={index}>{item.name}</p>;
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;
