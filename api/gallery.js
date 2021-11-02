import clientAPI from './api';
const prefix = '/gallery';

export default {
  list(param) {
    return clientAPI().post(prefix + '/list', param);
  },
};