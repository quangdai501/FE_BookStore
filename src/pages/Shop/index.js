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
                   
                    <div className="sort-bar row">
                        <p className="display">Hiển thị 1-12 trong 32 sản phẩm</p>
                        <select name="sort" className="sortby">
                            <option value="">Sắp xếp theo: Mặc định</option>
                            <option value="-createdAt">Sắp xếp theo: Mới nhất</option>
                            <option value="-createdAt">Sắp xếp theo: Cũ nhất</option>
                            <option value="-price">Sắp xếp theo giá: Từ thấp đến cao</option>
                            <option value="price">Sắp xếp theo giá: Từ cao đến thấp</option>
                        </select>
                        <select name="sort" className="sortby">
                            <option value="12">Hiển thị 12</option>
                            <option value="5">Hiển thị 5</option>
                            <option value="20">Hiển thị 20</option>
                            
                        </select>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Shop
