import React from "react";
import { useDispatch } from "react-redux";

import { modalActions } from "../store/modal/modal.slice";

export interface IModalProps {
  isOpened: boolean;
  id: string;
  closeModal: () => void;
}
 
export default function useModal(id: string) {
  const dispatch = useDispatch();
 
  const open = async (component: React.ReactElement) => {
    dispatch(modalActions.show({
      id,
      component: React.cloneElement(component, {
        ...component.props,
        closeModal: close,
      })
    }));
  }

  const close = async () => {
    dispatch(modalActions.hide({ id }));
  }
 
  return {
    open,
    close,
  }
}

export const withModal = <BaseProps extends IModalProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type ComponentProps = Omit<BaseProps, keyof IModalProps>;
  class Hoc extends React.Component<ComponentProps> {
    static displayName = `withModal(${BaseComponent.name})`;

    render() {
      return (
        <BaseComponent {...(this.props as BaseProps)} />
      );
    }
  }
  return Hoc;
}
