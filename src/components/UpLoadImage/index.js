import React, { useRef, useState } from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { updateImage } from "../../api/updateImage";
UpLoadImage.propTypes = {
  setImage: PropTypes.func.isRequired,
};
export default function UpLoadImage(props) {
  const [img, setImg] = useState(props.image);
  const fileRef = useRef();
  const handleImage = () => {
    if (fileRef.current) {
      //   console.log(fileRef.current.files[0]);
      updateImage(fileRef.current.files[0])
        .then((data) => {
          console.log(data);
          if (data.success) {
            setImg(data.data.url);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row upload-img">
      <div > 
        <img src={img} alt="" />
      </div>

      <input type="file" ref={fileRef} />
      <button
        type="button"
        onClick={handleImage}
        className="btn btn--upload btn--border-none"
      >
        Tải ảnh lên
      </button>
    </div>
  );
}
