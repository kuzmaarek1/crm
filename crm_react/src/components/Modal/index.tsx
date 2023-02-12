import React from "react";
import { FieldValues } from "react-hook-form";
import * as Styles from "./styles";
import type { ModalDetailsProps } from "components/ModalDetails";
import type { ModalFormProps } from "components/ModalForm";

const Modal =
  <H, TFieldValues extends FieldValues>(
    Components: (props: any) => JSX.Element
  ) =>
  (
    props: ModalDetailsProps<H, TFieldValues> | ModalFormProps<H, TFieldValues>
  ) => {
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
