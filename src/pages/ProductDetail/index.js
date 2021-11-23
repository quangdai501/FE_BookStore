import React, { useEffect, useState } from "react";
import "./style.scss";
import Review from "./item/Review";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../actions/productAction";
import { addToCart } from "../../actions/cartAction";
export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const id = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id.productID));
  }, []);
  const changeQuantity = (payload) => {
    if ((quantity + payload > 0) & (quantity + payload <= product.quantity)) {
      setQuantity(quantity + payload);
    }
  };
  const addCart = () => {
    dispatch(addToCart(product._id, quantity));
  };
  return (
    // <div className="container">
    //   <div className="row">
    //     <div className="col c-6 md-12 padding">
    //       <div className="product-image">
    //         <img
    //           src="https://cdn0.fahasa.com/media/catalog/product/cache/1/small_image/600x600/9df78eab33525d08d6e5fb8d27136e95/b/_/b_a-1-my-pure-planet.jpg"
    //           alt=""
    //         />
    //       </div>
    //     </div>
    //     <div className="col c-6 md-12 padding">
    //       <div className="product-infor">
    //         <div className="product-name">Đại Dương Đen - Những Câu Chuyện Từ Thế Giới Của Trầm Cảm</div>
    //         <div className="product-publisher">Nhà cung cấp: Thiên Long Hoàn Cầu</div>
    //         <div className="product-author">Tác giả: Đặng Hoàng Giang</div>
    //         <div className="product-price">89.000đ</div>
    //         <div className="purchase">
    //           <div className="number">
    //             <div className="minus"><i class="fas fa-minus"></i></div>
    //             <input type="text" disabled className="product-number" value="30" />
    //             <div className="plus"><i class="fas fa-plus"></i></div>
    //           </div>
    //         </div>
    //         <button className="btn">Thêm vào giỏ hàng</button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="product-desc">
    //       <h3 className="desc-title">
    //         Mô Tả Sản Phẩm
    //       </h3>
    //       <p>“Tôi sợ những cơn của mình, chúng xâm chiếm não bộ tôi, nhấn chìm lý trí của tôi, chúng phơi bày sự đau đớn, cô đơn, nỗi sầu thảm suốt những năm tháng niên thiếu của tôi, sự ám ảnh của bạo lực, của lẻ loi, của tức giận vì chẳng được ai giúp đỡ. Trong những giấc mơ, tôi thét lên với mọi người, cố gắng diễn đạt sự sợ hãi và tuyệt vọng của mình, nhưng không ai hiểu.”</p>

    //       <p>Đại dương đen là hành trình nhẫn nại của tác giả Đặng Hoàng Giang cùng người trầm cảm, kể cho chúng ta câu chuyện vừa dữ dội vừa tê tái về những số phận, mà vì định kiến và sự thiếu hiểu biết của chính gia đình và xã hội, đã bị tước đi quyền được sống với nhân phẩm, được cống hiến, được yêu thương và hạnh phúc.</p>

    //       <p>Là tiếng nói chia sẻ hiếm hoi với thế giới của người trầm cảm, là lời kêu gọi xóa bỏ định kiến xã hội, Đại dương đen đồng thời là công trình giáo dục tâm lý, cung cấp kiến thức căn bản về trầm cảm, hình hài nó thế nào, nó từ đâu tới, nó có thể phá hủy ra sao, có những phương thức trị liệu nào, và mỗi chúng ta có thể làm gì để những người không may mắn được sống an hòa với nhân phẩm của mình.</p>
    //     </div>
    //   </div>
    //   <Review />
    // </div>
    <div className="container">
      <div className="row">
        <div className="col c-6 md-12 padding">
          <div className="product-image">
            <img src={product.image} alt="" />
          </div>
        </div>
        <div className="col c-6 md-12 padding">
          <div className="product-infor">
            <div className="product-name">{product.name}</div>
            <div className="product-publisher">
              Nhà cung cấp: {product.publisher.name}
            </div>
            <div className="product-author">
              Tác giả: {product.authors.name}
            </div>
            <div className="product-price">{product.price}</div>
            <div className="purchase">
              <div className="number">
                <div className="minus" onClick={() => changeQuantity(-1)}>
                  <i class="fas fa-minus"></i>
                </div>
                <input
                  type="text"
                  disabled
                  className="product-number"
                  value={quantity}
                />
                <div className="plus" onClick={() => changeQuantity(+1)}>
                  <i class="fas fa-plus"></i>
                </div>
              </div>
            </div>
            <button onClick={addCart} className="btn">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="product-desc">
          <h3 className="desc-title">Mô Tả Sản Phẩm</h3>
          <p>{product.description}</p>
        </div>
      </div>
      <Review />
    </div>
  );
}
