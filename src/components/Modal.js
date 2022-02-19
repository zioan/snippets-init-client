import React from "react";
import "./Modal.scss";

function Modal(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h2>{props.title}</h2>
        </div>
        <div className="body">{props.children}</div>
        <button
          className="btn-close"
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
