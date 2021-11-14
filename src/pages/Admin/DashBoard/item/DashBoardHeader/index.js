import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
export default function DashBoardHeader() {
    return (
        <header className="header">
            <div className="row">
                <div className="col c-2">
                    <div className="left-side">
                        <Link to="/admin" className="link dash-board">Dash Board</Link>
                    </div>
                </div>
                <div className="col c-10">
                    <div className="right-side">
                        <i className="far fa-user"></i>
                        <div className="admin-name">
                            Trần Quang Đại
                        </div>
                        <p className="logout" title="Đăng xuất">
                            <i className="fas fa-sign-out-alt"></i>
                        </p>
                    </div>

                </div>
            </div>
        </header>
    )
}
