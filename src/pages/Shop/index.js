import React from 'react'
import Widget from './widget'
import'./style.scss'
const Shop = () => {
    return (
        <div className="shop">
            <div className="row">
                <div className="col c-3  ">
                    <Widget/>
                </div>
                <div className="col c-9  ">
                    <div className="sort-bar">
                        <p>Sắp xếp theo</p>
                        <div className="sort-bar__item">Mới nhất</div>
                        <div className="sort-bar__item">Bán chạy</div>
                        <div className="sort-bar__item dropdown ">
                            <p>Giá</p>
                            <div className="dropdown-content">
                               <p>Giá: Từ thấp đến cao</p>
                               <p>Giá: Từ cao đến thấp</p>
                           </div>
                        </div>

                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Shop
