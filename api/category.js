import clientAPI from './api';
const prefix = '/category';
export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get(prefix + '?' + q);
  },
  create(param) {
    return clientAPI().post(prefix + '/create', param);
  },
  update(param) {
    return clientAPI().post(prefix + '/update', param);
  },
  delete(param) {
    return clientAPI().post(prefix + '/delete', param);
  },
  getById(param) {
    return clientAPI().get(prefix + '/' + param);
  },
  getWithProduct(param) {
    return clientAPI().post(prefix + '/get-with-product', param);
  },
  getBySlug(param) {
    return clientAPI().get(prefix + '/detail/' + param);
  },
};