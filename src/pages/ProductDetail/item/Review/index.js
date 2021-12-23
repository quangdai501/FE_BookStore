import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Comment from '../../../../components/Comment';
import './style.scss';
export default function Review(props) {
    const { reviews } = props
    const { userInfo } = useSelector(state => state.userLogin);
    const [ratingNumber, setRatingNumber] = useState(5);
    const { pathname } = useLocation();
    console.log(reviews);
    function onChangeRating(number) {
        setRatingNumber(number);
    }
    const [comment, setComment] = useState('')
    function onChangeComment(e) {
        setComment(e.target.value);
    }
    function sendReview() {
        if (comment !== '') {
            const review = {
                comment: comment,
                rating: ratingNumber,
            }
            props.createReview(review)
        }
    }
    return (
        <div className="row shadow">
            <div className="col c-6 md-12 review">
                <h3 className="review-title">Đánh Giá - Nhận Xét Từ Khách Hàng
                </h3>
                {(reviews !== undefined && reviews.length > 0) ? reviews.map((item, index) => <Comment key={index} review={item} />) : <div className="row center-item review-none">Chưa có nhận xét nào</div>}
            </div>
            <div className="col c-6 md-12 write-review">
                <h3 className="review-title">Thêm đánh giá</h3>
                {userInfo?.email ? <>
                    <div className="row rating member">
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
                    <p><span className="title-text">Nhận xét:</span><textarea type="text" onChange={onChangeComment} /></p>
                    <button className="btn" onClick={sendReview}>Gửi đánh giá {props.loading ? "..." : ""}</button></> :
                    <div className="client">
                        <p className="title">Đăng nhập để gửi nhận xét của bạn</p>
                        <div className="row">
                            <div className="c-6 lg-12 md-12">
                                <Link className="btn client-login" to={`/login?redirect=${pathname}`}>Đăng nhập</Link>
                            </div>
                            <div className="c-6 lg-12 md-12">
                                <p className="sub-text">Bạn chưa có tài khoản?</p>
                                <Link to="/register" className="link link--underline">Đăng ký</Link>
                            </div>
                        </div>
                    </div>}
            </div>
        </div >
    )
}
