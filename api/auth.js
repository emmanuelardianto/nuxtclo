import clientAPI from './api';
const prefix = '/auth';

export default {
  login(param) {
    return clientAPI().post(prefix + '/login', param);
  },
  register(param) {
    return clientAPI().post(prefix + '/register', param);
  },
  forgotPassword(param) {
    return clientAPI().post(prefix + '/forgot-password', param);
  },
};