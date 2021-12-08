import React, { useState } from 'react'
import Comment from '../../../../components/Comment';
export default function Review(props) {


    const {reviews}=props
    const [ratingNumber, setRatingNumber] = useState(5);
    function onChangeRating(number) {
        setRatingNumber(number);
    }
    const [comment, setComment] = useState('')
    function onChangeComment(e) {
        setComment(e.target.value);
    }
    function sendReview(){
        console.log(comment,ratingNumber)
        if(comment!==''){
            const review={
                comment:comment,
                rating:ratingNumber,
            }
           props.createReview(review)
        }
    }
    return (
        <div className="row">
            <div className="col c-6 md-12 review">
                <h3 className="review-title">Đánh Giá - Nhận Xét Từ Khách Hàng
                </h3>
                {reviews?reviews.map((item,index) => <Comment key={index} review={item} />):<></>}
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
                <p><span className="title-text">Nhận xét:</span><textarea type="text" onChange={onChangeComment}/></p>
                <button className="btn" onClick={sendReview}>Gửi đánh giá</button>
            </div>
        </div>
    )
}
