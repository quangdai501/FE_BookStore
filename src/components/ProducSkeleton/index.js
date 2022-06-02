import React from 'react'
import './style.scss';
export default function ProductSkeleton() {
    return (
        <div className="product-skeleton">
            <div className="img-skt mb-5">
            </div>
            <div className="text-skt text-skt--width-haft"></div>
            <div className="text-skt mb-5"></div>
            <div className="text-skt"></div>
            <div className="text-skt text-skt--width-haft"></div>
            <div className="text-skt text-skt--large"></div>
        </div>
    )
}
