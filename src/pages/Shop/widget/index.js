import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../../actions/authorAction";
import { listCategorys } from "../../../actions/categoryAction";

const Widget = (props) => {
  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { authors } = authorList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categorys } = categoryList;

  const [category, setCategory] = useState(true);
  const [author, setAuthor] = useState(true);

  useEffect(() => {
    dispatch(listAuthors());
    dispatch(listCategorys());
  }, []);

  const toggleCategory = (e) => {
    e.stopPropagation();
    setCategory(!category);
  };
  const toggleAuthor = (e) => {
    e.stopPropagation();
    setAuthor(!author);
  };

  return (
    <>
      <div
        className="widget"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="category close">
          <div className="category__title">
            <h4>Bộ lọc</h4>
            <div onClick={props.showSidebar} className="toggle">
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

          {categorys && category === true ? (
            <div className="category__list">
              {categorys.map((item, index) => {
                return (
                  <p
                    onClick={() => props.direct("category", item.name)}
                    key={index}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          ) : (
            <></>
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
          {authors && author === true ? (
            <div className="category__list">
              {authors.map((item, index) => {
                return (
                  <p
                    onClick={() => props.direct("author", item.name)}
                    key={index}
                  >
                    {item.name}
                  </p>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Widget;
