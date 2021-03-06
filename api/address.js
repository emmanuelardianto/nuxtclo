import clientAPI from './api';
const prefix = '/address';
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
  setDefault(param) {
    return clientAPI().post(prefix + '/default', param);
  },
  delete(param) {
    return clientAPI().post(prefix + '/delete', param);
  },
  getById(param) {
    return clientAPI().get(prefix + '/' + param);
  },
};