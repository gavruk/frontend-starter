import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import Layout from '../../components/layout';

import { getProducts, productActions } from "../../store/product/product.slice";

import useModal from "../../hooks/useModal.hook";
import { IProduct } from "../../store/product/types";

import styles from "./index.module.scss";

import Confirm from "../../components/confirm/confirm";
import AddProduct from "./add-product";

export default function Products() {
  const products = useSelector(getProducts) || [];
  const dispatch = useDispatch();
  const addProductModal = useModal('add-product');
  const deleteConfirmModal = useModal('confirm-delete');

  React.useEffect(() => {
    dispatch(productActions.list());
  }, [dispatch]);

  const addProduct = () => {
    addProductModal.open(<AddProduct />);
  };

  const editProduct = (product: IProduct) => {
    addProductModal.open(<AddProduct product={product} />);
  };

  const deleteProduct = (product: IProduct) => {
    dispatch(productActions.delete({ id: product._id }));
  };

  const openDeleteProduct = (product: IProduct) => {
    deleteConfirmModal.open(<Confirm 
      red
      title="Confirm"
      text={`Are you sure you want to delete ${product.name}?`}
      yesText="Delete"
      noText="Cancel"
      onConfirm={() => deleteProduct(product)}
    />);
  };

  return (
    <Layout>
      <h1 className="title">Products</h1>

      <div className="columns">
        <div className="column is-full">
          <button className="button" onClick={addProduct}>Add product</button>
        </div>
      </div>

      <section className="section">
        <table className={classnames("table", "is-hoverable", "is-fullwidth", styles.table)}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <th>{p._id}</th>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  <div className="level">
                    <span className="level-item">
                      <button className="button" onClick={() => editProduct(p)}>Edit</button>
                    </span>
                    <span className="level-item">
                      <button className="button is-danger" onClick={() => openDeleteProduct(p)}>Delete</button>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  }
}
