import clientAPI from './api';
const prefix = '/product';
export default {
  getList(param) {
    const q = new URLSearchParams(param).toString()
    return clientAPI().get(prefix + '?' + q);
  },
  getAssets() {
    return clientAPI().get(prefix + '/get/assets');
  },
  create(payload) {
    return clientAPI().post(prefix + '/create', payload);
  },
  update(payload) {
    return clientAPI().post(prefix + '/update', payload);
  },
  getById(param) {
    return clientAPI().get(prefix + '/' + param);
  },
  getBySlug(param) {
    return clientAPI().get(prefix + '/detail/' + param);
  },
  imageUpdate(payload) {
    return clientAPI().post(prefix + '/image-update', payload, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data;`,
        }
      }
    );
  },
  imageRemove(payload) {
    return clientAPI().post(prefix + '/image-remove', payload);
  },
  variantImageUpdate(payload) {
    return clientAPI().post(prefix + '/variant-image-update', payload, {
        headers: {
          'accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data;`,
        }
      }
    );
  },
  variantImageRemove(payload) {
    return clientAPI().post(prefix + '/variant-image-remove', payload);
  },
};