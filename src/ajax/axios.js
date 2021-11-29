import _ from 'lodash';
import axios from 'axios';
import { reqInterceptors, resInterceptors } from './interceptors';

const { interceptors } = axios;

// 自定义 axios 默认配置
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=utf-8';

// request interceptors
interceptors.request.use(reqInterceptors.resolveApiEndpoint);

// response interceptors
interceptors.response.use(
  resInterceptors.successHandler,
  resInterceptors.errorHandler
);

const axiosRequest =
  (httpMethod) =>
  (url, options = {}) => {
    if (!url) {
      throw new Error('请传入参数url');
    } else if (typeof url !== 'string') {
      throw new Error('参数url的类型必须为string，请检查');
    }

    // request timeout(ms)
    const requestTimeout = 5 * 1000;
    const reqQuery = {};
    const config = {
      timeout: requestTimeout,
      ...options,
    };

    config.method = httpMethod;
    config.url = url;

    return axios(config);
  };

const ajax = {
  get: axiosRequest('get'),
  post: axiosRequest('post'),
  head: axiosRequest('head'),
  options: axiosRequest('options'),
  put: axiosRequest('put'),
  patch: axiosRequest('patch'),
  del: axiosRequest('delete'),
};

export default ajax;
