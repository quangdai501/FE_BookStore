import React, { useEffect, useState } from "react";
import Widget from "./widget";
import "./style.scss";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import { useLocation, useNavigate } from "react-router";
import Sortbar from "./Sortbar";
const useQuery = () => {
  const { search } = useLocation();
  // const querys = search
  //   ? JSON.parse(
  //       '{"' +
  //         decodeURI(search.substring(1))
  //           .replace(/"/g, '\\"')
  //           .replace(/&/g, '","')
  //           .replace(/=/g, '":"') +
  //         '"}'
  //     )
  //   : {};
  if (search) {
    const urlParams = new URLSearchParams(search.substring(1));
    const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
    const params = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      params[key] = value;
    }
    return params;
  }

  return {};
  // return React.useMemo(() => new URLSearchParams(search), [search]);
};

const Shop = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, total } = productList;

  const navigate = useNavigate();
  const location = useLocation();

  let url_query = useQuery().search;
  const [query, setQuery] = useState(useQuery());

  const size = query.size ? query.size : 12;
  const display = `${size * (page - 1) + 1}-${
    size * (page - 1) + products.length
  }`;
 
  useEffect(() => {
    // const params = new URLSearchParams(query);
    const params = Object.entries(query)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
    dispatch(listProducts(query));
  }, [JSON.stringify(query)]);

  useEffect(() => {
    if (url_query) {
      direct("search", url_query);
    }
  }, [JSON.stringify(url_query)]);

  const direct = (name, value) => {
    const newobj = { ...query };
    newobj[name] = value;
    setQuery(newobj);
  };

  const removeFilter = (name) => {
    const newobj = { ...query };
    delete newobj[name];
    setQuery(newobj);
  };
  return (
    <div className="shop ">
      <div className={sidebar ? "modal active" : "modal"} onClick={showSidebar}>
        <Widget sidebar={sidebar} showSidebar={showSidebar} direct={direct} />
      </div>

      <div>
        {query["search"] || query["author"] || query["category"] ? (
          <div className="filter-bar row">
            <p>Bộ lọc:</p>
            {query["author"] ? (
              <div className="label">
                <span>Tác giả: {query["author"]}</span>{" "}
                <b onClick={() => removeFilter("author")}>X</b>
              </div>
            ) : (
              ""
            )}
            {query["category"] ? (
              <div className="label">
                <span>Danh mục: {query["category"]}</span>{" "}
                <b onClick={() => removeFilter("category")}>X</b>
              </div>
            ) : (
              ""
            )}
            {query["search"] ? (
              <div className="label">
                <span>Từ khóa: {query["search"]}</span>{" "}
                <b onClick={() => removeFilter("search")}>X</b>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
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
