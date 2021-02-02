import React, { useEffect, useState } from "react";
import { v1 as uuid } from "uuid";

function TextInputField(props) {
  const {
    id = uuid(),
    label = "",
    type = "type",
    setValue,
    value,
    valid,
    blur,
    setBlur,
    passwordVisible = null,
    setPasswordVisible,
  } = props;

  const [styleClass, setStyleClass] = useState("unfocused");
  useEffect(() => {
    if (!blur) return;
    if (valid.isValid == true) {
      setStyleClass("valid");
    } else {
      setStyleClass("invalid");
    }
  }, [valid]);
  return (
    <div className="input-wrapper">
      <div className={`input-field input-container ${styleClass}`}>
        <label htmlFor={id}>{label}</label>
        {/* <div className="row-flex"> */}
          <input
            id={id}
            type={type}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onBlur={(e) => {
              setBlur(true);
            }}
            value={value}
          />
          {passwordVisible != null && (
            <>
              <i className="material-icons cursor-pointer" onClick={() => {setPasswordVisible(!passwordVisible)}}>
                {passwordVisible == true ? "visibility" : "visibility_off"}
              </i>
              <div className="box-10px"></div>
            </>
          )}
        {/* </div> */}
      </div>
      {blur && valid.isValid == false && valid.error && (
        <span className="helper-text error-text">{valid.error}</span>
      )}
    </div>
  );
}

export default TextInputField;
