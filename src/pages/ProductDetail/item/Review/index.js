import React, { useState } from 'react'
import Comment from '../../../../components/Comment';
export default function Review() {
    const [ratingNumber, setRatingNumber] = useState(5);
    function onChangeRating(number) {
        setRatingNumber(number);
    }
    return (
        <div className="row">
            <div className="col c-6 md-12 review">
                <h3 className="review-title">Đánh Giá - Nhận Xét Từ Khách Hàng
                </h3>
                {[1, 2, 3].map((index) => <Comment key={index} />)}
            </div>
            <div className="col c-6 md-12 write-review">
                <h3 className="review-title">Thêm đánh giá</h3>
                <div className="row rating">
                    <p className="title-text">Đánh giá: </p>
                    {
                        [1, 2, 3, 4, 5].map((item) => {
                            if (item <= ratingNumber) {
                                return <p className="star checked" onClick={() => onChangeRating(item)}><i class="fas fa-star"></i></p>
                            } else {
                                return <p className="star" onClick={() => onChangeRating(item)}><i class="fas fa-star"></i></p>
                            }
                        })
                    }
                </div>
                <p><span className="title-text">Nhận xét:</span><textarea type="text" /></p>
                <button className="btn">Gửi đánh giá</button>
            </div>
        </div>
    )
}
