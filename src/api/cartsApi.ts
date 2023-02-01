import axiosClient from './axiosClient';

const cartsApi = {
  getAll() {
    const url = '/carts';
    return axiosClient.get(url);
  },
};

export default cartsApi;
