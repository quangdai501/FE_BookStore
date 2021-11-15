import React, { useRef } from 'react'
import './style.scss';
import PropTypes from 'prop-types';
UpLoadImage.propTypes = {
    setImage: PropTypes.func.isRequired
}
export default function UpLoadImage(props) {
    const fileRef = useRef();
    const handleImage = () => {
        if (fileRef.current) {
            console.log(fileRef.current.files[0])
        }
    }

    return (<div className="row upload-img" >
        <input type="file" ref={fileRef} />
        <button type="button" onClick={handleImage} className="btn btn--upload btn--border-none">Tải ảnh lên</button>
    </div>
    )
}
