import React, { useRef, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { updateImage } from "../../api/updateImage";
UpLoadImage.propTypes = {
  setImage: PropTypes.func.isRequired,
};
export default function UpLoadImage(props) {

  const fileRef = useRef();
  const handleImage = () => {
    if (fileRef.current) {
      //   console.log(fileRef.current.files[0]);
      updateImage(fileRef.current.files[0])
        .then((data) => {
          console.log(data);
          if (data.success) {
            props.changeImg(data.data.url);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row upload-img">
      <input type="file" ref={fileRef} />
      <button
        type="button"
        onClick={handleImage}
        className="btn btn--upload btn--border-none"
      >
        Tải ảnh lên
      </button>
      <div>
        <img src={props.img} alt="" />
      </div>
    </div>
  );
}
