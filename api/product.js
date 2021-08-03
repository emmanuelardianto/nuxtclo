import { create } from 'core-js/core/object';
import clientAPI from './api';

export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get('/product?' + q);
  },
  getAssets() {
    return clientAPI().get('/product/update/assets');
  },
  create(payload) {
    return clientAPI().post('/product/create', payload);
  },
  getById(param) {
    return clientAPI().get('/product/' + param);
  },
};