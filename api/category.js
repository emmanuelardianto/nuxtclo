import clientAPI from './api';

export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get('/category?' + q);
  },
  create(param) {
    return clientAPI().post('/category/create', param);
  },
};