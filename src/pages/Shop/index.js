import React, { useEffect, useState } from "react";
import Widget from "./widget";
import "./style.scss";
import Product from "../../components/Product";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productAction";
import { useLocation, useNavigate } from "react-router";
import Sortbar from "./Sortbar";
import FilterBar from "./FilterBar";
const useQuery = () => {
  const { search } = useLocation();
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
  const display = `${size * (page - 1) + 1}-${size * (page - 1) + products ? products.length : 0
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
    <div className="space" >
      <div className="row gutter">
        <div className="c-3 padding">
          <div className={sidebar ? "modal active" : "modal"} onClick={showSidebar}>
            <Widget sidebar={sidebar} showSidebar={showSidebar} direct={direct} />
          </div>
        </div>
        <div className="c-9 lg-12 padding">
          <div className="row">
            <div className="c-12">
              {query["search"] || query["author"] || query["category"] ? (
                <FilterBar query={query} removeFilter={removeFilter} />
              ) : (
                <></>
              )}
              <Sortbar
                display={display}
                total={total}
                direct={direct}
                showSidebar={showSidebar}
              />
            </div>
            <div className="c-12">
              <div className="row">
                {products ? products.map((item, index) => (
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
                )) : <></>}
              </div>
            </div>
            <div className="c-12">
              <div className="pagination-section">
                <Pagination page={page} pages={pages} direct={direct} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
