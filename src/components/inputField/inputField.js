import React from "react";

export default function Inputfield(props) {
  return (
    <div style={{ paddingBottom: "10px" }}>
      <b>
        <div style={{ paddingBottom: "7px" }}>
          <label>{props.name}</label>
        </div>
      </b>
      <div>
        <input
          {...props}
          className={
            "inputField " +
            (props.className !== undefined ? props.className : "")
          }
        />
      </div>
    </div>
  );
}
