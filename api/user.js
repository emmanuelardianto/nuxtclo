import clientAPI from './api';

export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get('/user?' + q);
  },
  create(param) {
    return clientAPI().post('/user/create', param);
  },
  update(param) {
    return clientAPI().post('/user/update', param);
  },
  delete(param) {
    return clientAPI().post('/user/delete', param);
  },
  getById(param) {
    return clientAPI().get('/user/' + param);
  },
};