import React from 'react'
import './style.scss';
import PropTypes from 'prop-types';

Comment.propTypes = {
    review:{
        name: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
    }
}
export default function Comment(props) {
    const { name, updatedAt, rating, comment } = props.review;

    return (
        <div className="comment">
            <div className="comment__item">
                <div className="row-space-between">
                    <div className="comment-author">
                        {name}
                        {/* Lưu Đình vương */}
                    </div>
                    <div className="comment-date">{updatedAt}</div>
                </div>
                <div className="row star">
                    {
                        [1, 2, 3, 4, 5].map((item) => {
                            if (item <= rating) {
                                return <p className="star checked"><i class="fas fa-star"></i></p>
                            } else {
                                return <p className="star"><i class="fas fa-star"></i></p>
                            }
                        })
                    }
                </div>
                <div className="comment-content">
                    {comment}
                    {/* Máy của VN cũng k đòi hỏi gì nhiều nhưng thực sự nó k phù hợp với giá tiền. Midnh mua về dùng được vài tháng thì lỗi loa. Bảo hành sửa chữa máy rất rất lâu . */}
                </div>
            </div>
        </div>
    )
}
