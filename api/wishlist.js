
import clientAPI from './api';
const prefix = '/wishlist';
export default {
  getList(param) {
    return clientAPI().post(prefix + '/list',param);
  },
  create(param) {
    return clientAPI().post(prefix + '/create', param);
  },
  delete(param) {
    return clientAPI().post(prefix + '/delete', param);
  },
};