import axios from 'axios';

export default class {

  constructor({config, routes, headers}) {
    this.axios = axios.create(config);
    this.routes = routes;
    this.getHeaders = headers;

    this.routes.map(route => {
      let httpMethod = route.httpMethod ? route.httpMethod : 'get';
      this[route.name] = async (opts = {}) => {
        let query = this.buildQuery(route.url, opts, route.args);
        let routeHeaders = route.headers ? route.headers.reduce((acc, h) => ({...acc, ...this.getHeader(h)}), {}) : {};
        let headers = {...this.headers(), ...routeHeaders}

        console.log('query:', query);
        console.log('headers:', JSON.stringify(headers, null, 2));
        console.log('method:', httpMethod);

        return (httpMethod == 'get'
          ? this.axios[httpMethod](query, {headers})
          : this.axios[httpMethod](query, {}, {headers}))
          .catch(this.errorHandler);
      };
    });
  }

  buildQuery(prefix, opts, args) {
    let secondaryArgsType = '?';
    let suffix = args.map(arg => {
      if (!Object.keys(opts).includes(arg.name))
        return null;

      let opt = opts[arg.name];
      switch (arg.type) {
        case '/':
          return `/${opt}`
        case '&':
          let ret = `${secondaryArgsType}${arg.name}=${opt}`;
          secondaryArgsType = '&';
          return ret;
        default:
          throw new Error(`invalid arg type "${arg.type}"`);
      }
    }).join('');

    if (typeof prefix == 'function') {
      suffix = suffix.split('?')
      console.log(prefix(suffix[0]), suffix)
      return prefix(suffix[0]) + (suffix[1] ? suffix[1] : '');
    }
    return prefix + suffix;
  }

  getHeader(name) {
    return this.getHeaders()[name];
  }
}
