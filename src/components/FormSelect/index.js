import React from "react";
import "./style.scss";

export default function FormSelect({
  label,
  register,
  name,
  error,
  data,
  ...rest
}) {

  return (
    <div className="form-select">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select name={name} {...register(name, { ...rest })}>
          {data.map((item)=>( <option value={item}>{item}</option>))}
      </select>
      <p className="error-label">{error}</p>
    </div>
  );
}
