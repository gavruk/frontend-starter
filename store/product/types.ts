export interface ICreateProductRequest {
  name: string;
  price: number;
}

export interface IUpdateProductRequest extends ICreateProductRequest {
  id: string;
}

export interface IDeleteProductRequest {
  id: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
}

export interface IListProductsResponse {
  products: IProduct[];
}

