import clientAPI from './api';
const prefix = '/collection';
export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get(prefix + '?' + q);
  },
  getById(param) {
    return clientAPI().get(prefix + '/' + param);
  },
  update(param) {
    return clientAPI().post(prefix + '/update', param);
  },
};