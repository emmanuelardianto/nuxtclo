
import clientAPI from './api';
const prefix = '/wishlist';
export default {
  getList(param) {
    return clientAPI().post(prefix + '/list',param);
  },
  toggle(param) {
    return clientAPI().post(prefix + '/toggle', param);
  },
};