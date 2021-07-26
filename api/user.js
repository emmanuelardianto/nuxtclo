import clientAPI from './api';

export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get('/user?' + q);
  },
  create(param) {
    return clientAPI().post('/user/create', param);
  },
};