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

    this.routes = [
      {
        // https://apidocs.imgur.com/#eff60e84-5781-4c12-926a-208dc4c7cc94
        name: 'gallery',
        url: 'gallery',
        args: [
          {name: 'section',         type: '/'},
          {name: 'sort',            type: '/'},
          {name: 'window',          type: '/'},
          {name: 'page',            type: '/'},
          {name: 'showViral',       type: '&'},
          {name: 'mature',          type: '&'},
          {name: 'album_previews',  type: '&'},
        ]
      },
      {
        // https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce
        name: 'gallerySearch',
        url: 'gallery/search',
        args: [
          {name: 'sort',    type: '/'},
          {name: 'window',  type: '/'},
          {name: 'page',    type: '/'},
          {name: 'cats',    type: '&'},
        ]
      },
    ];

    this.routes.map(route => {
      this[route.name] = async (opts={}) => {
        let query = this.buildQuery(route.url, opts, route.args);
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