import clientAPI from './api';

export default {
  getList() {
    return clientAPI().get('/product');
  },
};