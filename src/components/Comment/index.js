import React from 'react'
import './style.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Comment.propTypes = {
    review:{
        name: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
    }
}
export default function Comment(props) {
    const { name, updatedAt, rating, comment,productName,product } = props.review;

    return (
        <div className="comment">
            <div className="comment__item">
                {product?
                    <div className='comment-product-name'>
                        <Link to={`/product-detail/${product}`}  target="_blank" rel="noopener noreferrer" >{productName}</Link>
                    </div>:<></>
                }
                <div className="row-space-between">
                    <div className="comment-author">
                        {name}
                    </div>
                    <div className="comment-date">{new Date(updatedAt).toLocaleString()}</div>
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
                </div>
            </div>
        </div>
    )
}
