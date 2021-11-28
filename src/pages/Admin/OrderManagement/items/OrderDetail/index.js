import React from 'react'
import './style.scss';
import OrderDetailItem from '../../../../../components/OrderDetailItem'
export default function OrderDetail(props) {
    console.log(props);
    return (
        <div className={`modal-detail ${props.show === props.id || "active"}`}>
            <div className="order-detail">
                <OrderDetailItem
                    key={props._id}
                    image={props.image}
                    name={props.name}
                    qty={props.qty}
                />
            </div>
        </div>
    )
}
