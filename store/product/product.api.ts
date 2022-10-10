import client from "../../api";

import * as types from './types';

const api = {
  create: (data: types.ICreateProductRequest): Promise<void> => client.post(`/products`, data),
  list: (): Promise<types.IListProductsResponse> => client.get(`/products`),
  delete: (data: types.IDeleteProductRequest): Promise<void> => client.del(`/products/${data.id}`),
};

export default api;
