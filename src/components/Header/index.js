import React from 'react';
import './style.scss';
export default function Header() {
    return (
        <header className="main-header">
            <div className="container header-body">
                <div className="row">
                    <div className="c-2">
                        <div className="logo">LogoStore</div>
                    </div>
                    <div className="c-8">
                        <div className="search">
                            <input type="text" className="search-input" />
                            <p className="search-icon">
                                <i class="fas fa-search"></i>
                            </p>
                        </div>
                    </div>
                    <div className="c-2">
                        <div className="header-right">
                            <div className="row">
                                <div className="c-6">
                                    <div className="cart">
                                        <i class="fas fa-shopping-bag"></i>
                                        <span className="cart__notify">
                                            2
                                        </span>
                                    </div>
                                </div>
                                <div className="c-6">
                                    <div className="signin">
                                        Đăng nhập
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
