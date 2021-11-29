import _ from 'lodash';
import { API_HOST } from '../../constants';

export default (config) => {
  const { url } = config;
  const regex = new RegExp(/(http:\/\/|https:\/\/)/g);
  const isAbsoluteAddr = regex.test(url);

  // return url if it's an absolute address
  if (isAbsoluteAddr) return config;

  if (_.head(url) !== '/') {
    throw new Error('Param "url" must start with "/". Please check.');
  }

  const apiHost = API_HOST[process.env.REACT_APP_ENV];

  if (!apiHost) {
    throw new Error(`API host is ${apiHost}. Please check.`);
  }

  if (_.last(apiHost) === '/') {
    throw new Error('API host ends with "/". Please check and remove it.');
  }

  Object.assign(config, {
    url: `${apiHost}${url}`,
  });

  return config;
};
