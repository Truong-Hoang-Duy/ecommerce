import { Products } from '../models';
import axiosClient from './axiosClient';

const productsApi = {
  getAll(): Promise<Products[]> {
    const url = '/products';
    return axiosClient.get(url);
  },
};

export default productsApi;
