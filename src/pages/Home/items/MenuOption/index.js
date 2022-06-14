import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listAuthors } from "../../../../actions/authorAction";
import { listCategorys } from "../../../../actions/categoryAction";
import Loading from '../../../../components/Loading';
import './style.scss';
export default function MenuOption(props) {
    const authorList = useSelector((state) => state.authorList);
    const { authors, loading } = authorList;
    const categoryList = useSelector((state) => state.categoryList);
    const { categorys } = categoryList;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirect = (option, name) => {
        const url = `/shop?${option}=${name}`
        navigate(url);
    }
    useEffect(() => {
        dispatch(listAuthors());
        dispatch(listCategorys());
    }, []);
    return (
        <div className="main-menu">
            <div className="main-menu__item menu-header">
                <p className="option-name"> <i class="fas fa-stream"></i>Danh mục</p><i class="fas fa-sort-down"></i>
            </div>
            <div className="main-menu__item">
                <Link to="/shop" className="option-name">Tất cả</Link> <i class="fas fa-angle-right"></i>
            </div>
            <div className="main-menu__item">
                <Link to="/shop?category=" className="option-name">Tác giả</Link> <i class="fas fa-angle-right"></i>
                <div className="menu-right">
                    {authors ? (
                        <div className="row gutter">
                            {authors.map((item, index) => {
                                return (
                                    <p className="c-4 padding menu-right__item"
                                        onClick={() => redirect("author", item.name)}
                                        key={index}
                                    >
                                        {item.name}
                                    </p>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="main-menu__item">
                <Link to="" className="option-name">Danh mục sản phẩm</Link> <i class="fas fa-angle-right"></i>
                <div className="menu-right">
                    {categorys ? (
                        <div className="row gutter">
                            {categorys.map((item, index) => {
                                return (
                                    <p className="c-6 padding menu-right__item"
                                        onClick={() => redirect("category", item.name)}
                                        key={index}
                                    >
                                        {item.name}
                                    </p>
                                );
                            })}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="main-menu__item">
                <Link to="/shop?sort=price" className="option-name">Giá tăng dần</Link> <i class="fas fa-angle-right"></i>
            </div>
            <div className="main-menu__item">
                <Link to="/shop?sort=-price" className="option-name">Giá giảm dần</Link> <i class="fas fa-angle-right"></i>
            </div>
            <div className="main-menu__item">
                <Link to="/shop?sort=-sold" className="option-name">Sách bán chạy</Link> <i class="fas fa-angle-right"></i>
            </div>
            <div className="main-menu__item">
                <Link to="/shop?sort=-createdAt" className="option-name">Sách mới ra mắt</Link> <i class="fas fa-angle-right"></i>
            </div>
            <div className="main-menu__item">
                <Link to="/shop?sort=sold" className="option-name">Sách đặc sắc</Link> <i class="fas fa-angle-right"></i>
            </div>
        </div>
    )
}
