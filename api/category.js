import clientAPI from './api';

export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get('/category?' + q);
  },
  create(param) {
    return clientAPI().post('/category/create', param);
  },
  update(param) {
    return clientAPI().post('/category/update', param);
  },
  delete(param) {
    return clientAPI().post('/category/delete', param);
  },
  getById(param) {
    return clientAPI().get('/category/' + param);
  },
};