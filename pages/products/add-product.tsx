import * as React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import classnames from "classnames";

import Modal from "../../components/modal/modal";

import { IModalProps, withModal } from "../../hooks/useModal.hook";
import { productActions } from "../../store/product/product.slice";

interface IFormData {
  name: string;
  price: string
}

interface IProps extends IModalProps {}

function AddProduct({
  closeModal,
  isOpened,
}: IProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data: IFormData) => {
    dispatch(productActions.create({
      name: data.name,
      price: +data.price,
    }));
    closeModal();
  };

  return (
    <Modal show={isOpened} onClose={closeModal}>
      <h3 className="title">Add Product</h3>

      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input 
              className={classnames('input', { 'is-danger': !!errors.name })}
              {...register('name', { required: true })} 
            />
          </div>
          {errors.name && <p className="help is-danger">Name is required</p>}
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input 
              type="number"
              className={classnames('input', { 'is-danger': !!errors.price })}
              {...register('price', { 
                required: { value: true, message: 'Price is required' }, 
                min: { value: 0.01, message: 'Minimum price is $0.01' },
              })} 
            />
          </div>
          {errors.price && <p className="help is-danger">{errors.price.message.toString()}</p>}
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-link">Create</button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
export default withModal(AddProduct);
