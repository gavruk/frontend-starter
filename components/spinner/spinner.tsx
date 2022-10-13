import classnames from "classnames";

import styles from './spinner.module.scss';

interface IProps {
  className?: string;
}

export default function Spinner({ className }: IProps) {
  return (
    <div className={classnames(styles.spinner, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
