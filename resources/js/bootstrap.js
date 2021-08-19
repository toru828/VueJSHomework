window._ = require('lodash');
import store from './store';
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(config => {
const accessToken = store.state.accessor.accessToken;
config.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : ``;
return config;
});

axios.interceptors.response.use((response) => {
    return Promise.resolve(response);
}, error => {
    // handle the response error

    return Promise.reject(error);
});
