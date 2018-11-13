import axios from 'axios';

export default class {

  constructor({config, routes, headers}) {
    this.axios = axios.create(config);
    this.routes = routes;
    this.getHeaders = headers;

    this.routes.map(route => {
      this[route.name] = async (opts = {}) => {
        let query = this.buildQuery(route.url, opts, route.args);
        let routeHeaders = route.headers ? route.headers.reduce((acc, h) => ({...acc, ...this.getHeader(h)}), {}) : {};
        let headers = {...this.headers, ...routeHeaders}

        console.log('query:', query);
        console.log('headers:', JSON.stringify(headers, null, 2));

        return this.axios.get(query, {headers})
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
      return prefix(suffix[0]) + suffix.length ? suffix[1] : '';
    }
    return prefix + suffix;
  }

  getHeader(name) {
    return this.getHeaders()[name];
  }
}
