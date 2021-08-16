import clientAPI from './api';
const prefix = '/product';
export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get(prefix + '?' + q);
  },
  getAssets() {
    return clientAPI().get(prefix + '/get/assets');
  },
  create(payload) {
    return clientAPI().post(prefix + '/create', payload);
  },
  getById(param) {
    return clientAPI().get(prefix + '/' + param);
  },
};