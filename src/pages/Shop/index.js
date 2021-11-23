import React, { useEffect, useState } from "react";
import Widget from "./widget";
import "./style.scss";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import { useLocation, useNavigate } from "react-router";
import Sortbar from "./Sortbar";

const Shop = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, total } = productList;

  const navigate = useNavigate();
  const location = useLocation();

  let query = useQuery();
  const size = query.size ? query.size : 12;
  const display = `${size * (page - 1) + 1}-${
    size * (page - 1) + products.length
  }`;
  // console.log(query);
  useEffect(() => {
    dispatch(listProducts(query));
  }, [JSON.stringify(query)]);
  const direct = (name, value) => {
    query[name] = value;
    const params = new URLSearchParams(query);
    // console.log(value)
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };
  function useQuery() {
    const { search } = location;
    const query = search
      ? JSON.parse(
          '{"' +
            decodeURI(
              search.substring(1).replace(/&/g, '","').replace(/=/g, '":"')
            ) +
            '"}'
        )
      : {};
      // console.log(search.substring(1),query)
    return query;
    // return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  return (
    <div className="shop ">
      <div
        className={sidebar ? "modal active" : "modal"}
        onClick={showSidebar}
      >
        <Widget sidebar={sidebar} showSidebar={showSidebar} direct={direct} />
      </div>

      <div>
        <Sortbar
          display={display}
          total={total}
          direct={direct}
          showSidebar={showSidebar}
        />
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

        <Pagination page={page} pages={pages} direct={direct} />
      </div>
    </div>
  );
};

export default Shop;
