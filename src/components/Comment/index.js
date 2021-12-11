import React from 'react'
import './style.scss';
import { Link } from 'react-router-dom';

export default function Comment(props) {
    const { name, updatedAt, rating, comment, productName, product } = props.review;

    return (
        <div className="comment">
            <div className="comment__item">
                {product ?
                    <div className='comment-product-name'>
                        <Link to={`/product-detail/${product}`} target="_blank" rel="noopener noreferrer" >{productName}</Link>
                    </div> : <></>
                }
                <div className="row-space-between">
                    <div className="comment-author">
                        {name}
                    </div>
                    <div className="comment-date">{new Date(updatedAt).toLocaleString()}</div>
                </div>
                <div className="row star">
                    {
                        [1, 2, 3, 4, 5].map((item, index) => {
                            if (item <= rating) {
                                return <p key={index} className="star checked"><i class="fas fa-star"></i></p>
                            } else {
                                return <p key={index} className="star"><i class="fas fa-star"></i></p>
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
