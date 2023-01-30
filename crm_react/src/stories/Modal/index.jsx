import React from "react";
import * as Styles from "./styles";

const Modal = (Components) => (props) => {
  return (
    <Styles.ModalWrapper modalIsOpen={props.modalIsOpen}>
      <Styles.CloseButton size="3vh" onClick={props.closeModal} />
      <Components {...props} />
    </Styles.ModalWrapper>
  );
};

export default Modal;
