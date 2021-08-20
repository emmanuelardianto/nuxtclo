import clientAPI from './api';
const prefix = '/auth';

export default {
  login(param) {
    return clientAPI().post(prefix + '/login', param);
  },
};