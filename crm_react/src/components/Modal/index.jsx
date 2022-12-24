import React from "react";
import * as Styles from "./styles";

const Modal = (Components) => (props) => {
  return (
    <Styles.ModalWrapper
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      <Styles.CloseButton size="3vh" onClick={props.closeModal} />
      <Components {...props} />
    </Styles.ModalWrapper>
  );
};

export default Modal;
