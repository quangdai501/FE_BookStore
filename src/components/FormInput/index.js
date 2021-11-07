import React from "react";
import "./style.scss";

export default function FormInput({
  label,
  register,
  name,
  error,
  type,
  ...rest
}) {
  console.log("rest", { ...rest });
  return (
    <div className="form-input">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input type={type} name={name} {...register(name, { ...rest })} />
      <p className="error-label">{error}</p>
    </div>
  );
}
