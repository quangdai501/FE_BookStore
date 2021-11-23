import React, { useEffect, useState } from "react";
import Widget from "./widget";
import "./style.scss";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import { useLocation } from "react-router";
function useQuery() {
  const { search } = useLocation();
  const query=search?JSON.parse(
    '{"' +
      decodeURI(
        search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')
      ) +
      '"}'
  ):{}
  return query;
  // return React.useMemo(() => new URLSearchParams(search), [search]);
}
const Shop = (props) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages,total } = productList;
  let query = useQuery();
  const size=query.size?query.size:12
  const display=`${size*(page-1)+1}-${size*(page-1)+products.length}`
  // console.log(query);
  useEffect(() => {
    dispatch(listProducts(query));
  }, [JSON.stringify(query)]);
  return (
    <div className="shop">
      <Widget display={display} total={total} query={query} />

      <div className="row">
        <div className="row">
          {products.map((item, index) => (
            <div className="col c-3 lg-4 md-6">
              <Product
                imageURL={item.image}
                name={item.name}
                price={item.price}
                author={item.authors.name}
                publisher={item.publisher.name}
                productId={item._id}
              />
            </div>
          ))}
        </div>
        <div className="col c-11">
          {" "}
          <Pagination page={page} pages={pages} query={query} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
