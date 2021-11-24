import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './style.scss';
export default function Header() {

    const [query, setQuery] = useState('')
    const changeQuery=(e)=>setQuery(e.target.value)

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    let navigate=useNavigate()
    const gotoCart=()=>{
        navigate('/cart')
    }
    const gotoLogin=()=>{
        navigate('/login')
    }
    const Search=()=>{
    
    navigate({
        pathname: 'shop',
        search: `search=${query}`,
        });
    
    }
    return (
        <header className="main-header">
            <div className="container header-body">
                <div className="row">
                    <div className="c-2">
                        <div className="logo">LogoStore</div>
                    </div>
                    <div className="c-8">
                        <div className="search">
                            <input onChange={changeQuery} type="text" className="search-input" value={query}/>
                            <p className="search-icon" onClick={Search}>
                                <i class="fas fa-search"></i>
                            </p>
                        </div>
                    </div>
                    <div className="c-2">
                        <div className="header-right">
                            <div className="row">
                                <div className="c-6">
                                    <div className="cart" onClick={gotoCart}>
                                        <i class="fas fa-shopping-bag"></i>
                                        <span className="cart__notify">
                                            {cartItems.length}
                                        </span>
                                    </div>
                                </div>
                                <div className="c-6">
                                    <div className="signin" onClick={gotoLogin}>
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
