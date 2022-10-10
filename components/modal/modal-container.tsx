import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store/store";
import { IStackItem } from "../../store/modal/types";

export default function ModalContainer() {
  const stack = useSelector((state: AppState) => state.modal.stack);
  return (
    <>
      {stack.map((modal: IStackItem) =>
        React.cloneElement(modal.component, {
          id: modal.id,
          isOpened: modal.isOpened,
          key: `MODAL_${modal.id}`,
          ...modal.component.props,
        })
      )}
    </>
  );
}
