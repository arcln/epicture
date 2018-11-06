import axios from 'axios';

export default class {
  constructor(clientId, clientSecret, errorHandler) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.errorHandler = errorHandler || (e => console.error(JSON.stringify(e.response.data)));
    this.axios = axios.create({
      baseURL: 'https://api.imgur.com/3',
      timeout: 1000,
      headers: {'Authorization': `Client-ID ${this.clientId}`}
    });

    this.routes = {
      gallery: [
        {name: 'section',   type: '/'},
        {name: 'sort',      type: '/'},
        {name: 'window',    type: '/'},
        {name: 'page',      type: '/'},
        {name: 'showViral', type: '&'},
        {name: 'mature',    type: '&'},
        {name: 'album_previews',  type: '&'},
      ],
    };

    Object.keys(this.routes).map(key => {
      this[key] = async (opts={}) => {
        let args = this.routes[key];
        let query = this.buildQuery(key, opts, args);
        console.log('query:', query);
        return this.axios.get(query)
          .catch(this.errorHandler);
      };
    });
  }

  buildQuery(prefix, opts, args) {
    let secondaryArgsType = '?';
    return '/' + prefix + args.map(arg => {
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
  }
}