import clientAPI from './api';
const prefix = '/collection';
export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get(prefix + '?' + q);
  },
  getById(param, query) {
    const q = new URLSearchParams(query).toString()
    return clientAPI().get(prefix + '/' + param + '?' + q);
  },
  update(param) {
    return clientAPI().post(prefix + '/update', param);
  },
  delete(param) {
    return clientAPI().post(prefix + '/delete', param);
  },
};