/* eslint-disable */
import axios from 'axios';

class HttpRequest {
  constructor(server){
    this.httpClient = axios.create({
      baseURL: server
    });
  } 

  request(method, path, params) {
    const options = {
      method,
      url: path,
    };

    if (params) {
      if (method === 'get') {
        options.params = params;
      } else {
        options.data = params;
      }
    }

    return this.httpClient
      .request(options)
      .then(response => {
        const data = response.data;
        return data;
      })
      .catch(err => {
        let error;
        error = new Error(
          '[API] HTTP request failed. Inspect this error for more info'
        );
        Object.assign(error, err.response);

        console.warn(`[WARN] ${error.message || ''}`, error);
        throw error;
      });
  }
}

export default HttpRequest;
