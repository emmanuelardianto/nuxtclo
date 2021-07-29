import clientAPI from './api';

export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get('/product?' + q);
  },
  getAssets() {
    return clientAPI().get('/product/get-product-assets');
  }
};