import client from "../../api";

import * as types from './types';

const api = {
  create: (data: types.ICreateProductRequest): Promise<void> => client.post(`/products`, data),
  update: (data: types.IUpdateProductRequest): Promise<void> => client.put(`/products/${data.id}`, data),
  list: (): Promise<types.IListProductsResponse> => client.get(`/products`),
  delete: (data: types.IDeleteProductRequest): Promise<void> => client.del(`/products/${data.id}`),
};

export default api;
