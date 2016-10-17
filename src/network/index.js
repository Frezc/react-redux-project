/**
 * Created by Frezc on 2016/10/17.
 */
import { message } from 'antd';
import fetch from 'isomorphic-fetch';
import { constructQuery, constructFormData } from '../helpers';
import auth from './jwtAuth';

/**
 * fetch with auto retry
 * @param url request url
 * @param params fetch params with { retry(int, default 3), deltaTime(int, default 1000(ms)) }
 */
export function fetchR(url, params) {
  params = Object.assign({
    retry: 3,
    deltaTime: 1000
  }, params);

  return new Promise((resolve, reject) => {
    const wrappedFetch = (retry) => {
      fetch(url, params)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          if (retry > 1) {
            setTimeout(() => {
              wrappedFetch(retry - 1);
            }, params.deltaTime);
          } else {
            reject(error);
          }
        })
    };
    wrappedFetch(params.retry);
  });
}

/**
 * @param url
 * @param params
 * @param needAuth
 * @returns {Promise} then(json) catch({ status, message })
 */
export async function easyFetch(url, params, needAuth = true) {
  if (needAuth) {
    const headers = params.headers || new Headers();
    const { token } = await auth.getAuth();
    headers.set('Authorization', `Bearer ${token}`);
    params.headers = headers;
  }

  return await new Promise((res, rej) => {
    fetchR(url, params)
      .then(response => {
        if (response.ok) {
          return response.json().then(json => {
            res(json);
          })
        } else {
          return readData(response)
            .then(data => {
              const errorMsg = {
                status: response.status,
                message: typeof data === 'object' ? data.error : data
              };

              if (errorMsg.status == 400 && typeof errorMsg.message === 'object') {
                errorMsg.error = resolveInputError(errorMsg.message);
                errorMsg.message = '参数错误！';
              }
              if (errorMsg.status == 429) {
                errorMsg.message = '请求过于频繁，喝杯咖啡休息一分钟吧。';
              }
              if (errorMsg.status == 401 && errorMsg.message == 'token_expired') {
                auth.needRefresh = true;
                return res(easyFetch(url, params, needAuth));
              }
              message.error(`Error[${errorMsg.status}]: ${errorMsg.message}`);
              rej(errorMsg);
            })
        }
      })
      .catch(error => {
        console.log(error)
        message.error(`Unexpected error!`);
        rej({ message: 'Unexpected error!' });
      });
  })
}

/**
 * read response body to json or text
 * @param response
 */
function readData(response) {
  const contentType = response.headers.get("content-type");
  if(contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return response.text();
  }
}

/**
 * @param error obj { [name]: ['error1', 'error2'], ... }
 * @returns obj { [name]: { validateStatus: 'error', help: 'error1 error2' }, ... }
 */
function resolveInputError(error) {
  return Object.entries(error).reduce((obj, entry) => {
    obj[entry[0]] = {
      validateStatus: 'error',
      help: entry[1].join(' ')
    };
    return obj;
  }, {});
}

/**
 * http get
 * @param url only path
 * @param params query params
 * @param needAuth
 */
export function easyGet(url, params, needAuth = true) {
  params = Object.assign({
    _: Date.now()
  }, params);
  return easyFetch(`${url}?${constructQuery(params)}`, {
    method: 'GET',
    mode: 'cors'
  }, needAuth);
}

/**
 * http post
 * @param url path and query (use constructQuery)
 * @param params body params
 */
export function easyPost(url, params, needAuth = true) {
  return easyFetch(url, {
    method: 'POST',
    mode: 'cors',
    body: constructFormData(params)
  }, needAuth);
}
