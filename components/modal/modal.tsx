import React from "react";
import classnames from "classnames";

import styles from "./modal.module.css";

interface IProps {
  className?: string;
  show?: boolean;
  children: React.ReactElement | React.ReactElement[];
  onClose: () => void;
  isLoading?: boolean;
}

export default function Modal({
  className,
  show,
  children,
  onClose,
  isLoading = false,
}: IProps) {
  function handleBackgroundClick(e: any) {
    e.stopPropagation();
    onClose();
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className={classnames("modal", className, { 'is-active': show })}>
      <div className="modal-background" onClick={handleBackgroundClick}></div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
      <div className="modal-content">
        <div className={classnames("box", styles.box)}>
          {children}
        </div>
      </div>
    </div>
  );
}
