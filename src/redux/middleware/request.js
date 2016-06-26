import * as urls from '../../utils/urls';

const defaultFetchParams = {
  method: 'get',
  mode: 'cors',
  // credentials: 'include', // to include cookies we would need this
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

function defaults({ headers, ...other } = {}) {
  const defaultHeaders = defaultFetchParams.headers;

  return {
    ...defaultFetchParams,
    ...other,
    headers: {
      ...defaultHeaders,
      ...headers
    }
  };
}

export default function request({ dispatch, getState }) {
  return (next) => async (action) => {
    // meta keys which are used are fetch and includeToken
    const { type, payload = {}, meta = {} } = action;
    const { auth } = getState();

    // If its not a REST action to be processed just
    // return and pass to the next middleware
    if (!type || type.constructor !== Array) return next(action);

    const [BEGIN, SUCCESS, FAILURE] = action.type;

    const includeToken = meta.includeToken === undefined
      ? true
      : meta.includeToken;

    const transformer = meta.transformer || ((data) => data);

    let [url, fetchParams = {}] = meta.fetch;

    fetchParams = defaults(fetchParams);

    dispatch({
      type: BEGIN,
      payload
    });

    if (typeof fetchParams.body === 'object'
      && fetchParams.body.constructor !== FormData) {

      fetchParams.body = JSON.stringify(fetchParams.body);
    }

    if (url.match(/^http/) === null) url = `${urls.api}${url}`;

    // if its a request against our own API insert the accessToken as an header
    if (auth.accessToken && url.indexOf(urls.api) !== -1 && includeToken) {
      fetchParams.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    const headers = fetchParams.headers;

    // clear null headers which we use to
    // indicate that we want a header to be removed
    for (const header in headers) {
      if (headers.hasOwnProperty(header) && headers[header] === null) {
        delete headers[header];
      }
    }

    try {
      const response = await fetch(url, fetchParams);
      let json = await response.json();
      json = transformer(json);

      if (response.status >= 200 && response.status < 300) {
        dispatch({
          type: SUCCESS,
          payload: json,
          meta
        });
      } else {
        dispatch({
          type: FAILURE,
          error: true,
          payload: json,
          meta
        });
      }

      // Return response with status code
      return {
        status: response.status,
        body: json
      };
    } catch (err) {
      console.error('request error', err); // eslint-disable-line

      dispatch({
        type: FAILURE,
        error: true,
        payload: fetchParams.method === 'delete' ? payload : {},
        meta
      });
    }
  };
}
