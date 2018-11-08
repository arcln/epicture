import axios from 'axios';
import { AuthSession } from 'expo';

export default class {

  constructor(clientId, clientSecret, userToken, errorHandler) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.errorHandler = errorHandler || (e => console.error(JSON.stringify(e.response.data)));
    this.initAxios(userToken);

    let sortWindowPageFilters = [
      {name: 'sort', type: '/'},
      {name: 'window', type: '/'},
      {name: 'page', type: '/'},
    ];

    this.routes = [
      { // https://apidocs.imgur.com/#eff60e84-5781-4c12-926a-208dc4c7cc94
        name: 'gallery',
        url: 'gallery',
        args: [
          {name: 'section', type: '/'},
          ...sortWindowPageFilters,
          {name: 'showViral', type: '&'},
          {name: 'mature', type: '&'},
          {name: 'album_previews', type: '&'},
        ]
      },
      { // https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce
        // FIXME not tested
        name: 'gallerySearch',
        url: 'gallery/search',
        args: [...sortWindowPageFilters, {name: 'q', type: '&'}]
      },
      { // https://apidocs.imgur.com/#f64e44be-8bf3-47bb-90d5-d1bf39c5e417
        // FIXME not tested
        name: 'galleryAlbum',
        url: 'gallery/album',
        args: [{name: 'galleryHash', type: '/'}]
      },
      { // https://apidocs.imgur.com/#6b97ac3f-0fbc-43d9-bb8e-47321ee6dc46
        // FIXME not tested
        name: 'galleryImage',
        url: 'gallery/image',
        args: [{name: 'galleryImageHash', type: '/'}]
      },
      { // https://apidocs.imgur.com/#0f89160b-8bb3-40c5-b17b-a02cc8a2f73d
        // FIXME not tested
        name: 'galleryTag',
        url: 'gallery/t',
        args: [{name: 'tagName', type: '/'}, ...sortWindowPageFilters]
      },
      { // https://apidocs.imgur.com/#57124d89-c27d-4def-8723-483242db09ee
        // FIXME not tested
        name: 'galleryItemTags',
        url: suffix => `gallery${suffix}/tags`,
        args: [{name: 'galleryHash', type: '/'}]
      },
      { // https://apidocs.imgur.com/#c94c8719-fe68-4854-b96d-70735dd8b2bc
        // FIXME not tested
        name: 'account',
        url: 'account',
        args: [{name: 'username', type: '/'}]
      },
    ];

    this.routes.map(route => {
      this[route.name] = async (opts = {}) => {
        let query = this.buildQuery(route.url, opts, route.args);
        console.log('query:', query);
        return this.axios.get(query)
          .catch(this.errorHandler);
      };
    });
  }

  initAxios(token=null) {
    let headers = {'Authorization': `Client-ID ${this.clientId}`};

    if (token)
      headers.Bearer = token;

    this.axios = axios.create({
      baseURL: 'https://api.imgur.com/3',
      timeout: 1000,
      headers: headers
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

    if (typeof prefix == 'function')
      return '/' + prefix(suffix);
    return '/' + prefix + suffix;
  }
}