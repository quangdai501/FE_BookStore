import React, { useState } from "react";
import Widget from "./widget";
import "./style.scss";
import Product from "../../components/Product";
import Pagination from "../../components/Pagination";
const Shop = () => {
 
  return (
    <div className="shop">
     
      <Widget />

          <div className="row">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div className="col c-3 lg-4 md-6">
                <Product
                  imageURL={"./images/img1.jpg"}
                  name={
                    "Think Like a Monk: Train Your Mind for Peace and Purpose of your life"
                  }
                  price={20000}
                  author={"Author"}
                  publisher={"Publisher"}
                />
              </div>
            ))}
            <div className="col c-11"> <Pagination /></div>
          </div>
         
   
      </div>
  );
};

export default Shop;
