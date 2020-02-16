import React from "react";
import "./Input.css";

const Input = ({
  name,
  placeholder,
  value,
  errors,
  type = "text",
  onChange,
  disabled = false,
  loading = false
}) => {
  let classes =
    "form-control " +
    (errors ? " is-invalid " : "") +
    (loading ? " loading" : "");
  return (
    <div className="form-group">
      <input
        className={classes}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
