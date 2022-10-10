import React from "react";
import classnames from "classnames";

import { IModalProps, withModal } from "../../hooks/useModal.hook";

import styles from "./confirm.module.css";

interface IProps extends IModalProps {
  className?: string;
  title?: string;
  text?: string;
  yesText?: string;
  noText?: string;
  red?: boolean;
  onConfirm: () => void;
}

function Confirm({
  isOpened,
  closeModal,

  className,
  title,
  text,
  yesText,
  noText,
  red = false,
  onConfirm
}: IProps) {
  function handleBackgroundClick(e: any) {
    e.stopPropagation();
    closeModal();
  }

  function handleConfirmation() {
    onConfirm();
    closeModal();
  }


  return (
    <div className={classnames("modal", className, { 'is-active': isOpened })}>
      <div className="modal-background" onClick={handleBackgroundClick}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title || "Confirm"}</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">
          {text}
        </section>
        <footer className="modal-card-foot">
          <button 
            className={classnames("button", { "is-success": !red, "is-danger": red })}
            onClick={handleConfirmation}
          >{yesText || "Yes"}</button>
          <button className="button" onClick={closeModal}>{noText || "Cancel"}</button>
        </footer>
      </div>
    </div>
  );
}
export default withModal(Confirm);
