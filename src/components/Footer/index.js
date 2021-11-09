import React from "react";
import "./style.scss";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container footer-body">
        <div className="row">
          <div className="col c-3 md-12">
            <h3 className="footer-body-head">Sản phẩm và dịch vụ</h3>
            <div className="row">
              <div className="col c-6">
                <ul className="footer-list">
                  <li className="footer-list__item">
                    <a href="/#">Tiểu thuyết</a>
                  </li>
                  <li className="footer-list__item">
                    <a href="/#">Trinh thám</a>
                  </li>
                  <li className="footer-list__item">
                    <a href="/#">Khoa học</a>
                  </li>
                  <li className="footer-list__item">
                    <a href="/#">Nấu ăn</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col c-3 md-6">
            <h3 className="footer-body-head">Chính sách</h3>
            <ul className="footer-list">
              <li className="footer-list__item">
                <a href="/#">Vận chuyển</a>
              </li>
              <li className="footer-list__item">
                <a href="/#">Thanh toán</a>
              </li>
            </ul>
          </div>
          <div className="col c-3 md-6">
            <h3 className="footer-body-head">Về chúng tôi</h3>
            <ul className="footer-list">
              <li className="footer-list__item">
                <a href="/#">Lịch sử thành lập</a>
              </li>
              <li className="footer-list__item">
                <a href="/#">Giá trị cốt lõi</a>
              </li>
              <li className="footer-list__item">
                <a href="/#">Tầm nhìn, Sứ mệnh</a>
              </li>
            </ul>
          </div>
          <div className="col c-3 md-12">
            <h3 className="footer-body-head">Hệ thống cửa hàng</h3>
            <div className="row address">
              <div className="col c-6">
                <h4 className="footer-body-head-2">TP.Hồ Chí Minh:</h4>
                <ul className="address-list">
                  <li className="address-list__item">
                    <p className="detail">
                      Số 1, đường Võ Văn Ngân, P.Linh Chiểu, TP.Thủ Đức
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">Copyright (C) 2020</p>
      </div>
    </div>
  );
}
