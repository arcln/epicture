import axios from 'axios';

export default class {

  constructor(clientId, clientSecret, userToken, errorHandler) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.errorHandler = errorHandler || (e => console.error(JSON.stringify(e.response.data)));
    this.headers = this.getHeader('clientId');
    this.token = userToken;
    this.axios = axios.create({
      baseURL: 'https://api.imgur.com',
      timeout: 1000,
    });

    let sortWindowPageFilters = [
      {name: 'sort', type: '/'},
      {name: 'window', type: '/'},
      {name: 'page', type: '/'},
    ];

    this.routes = [
      { // https://apidocs.imgur.com/#eff60e84-5781-4c12-926a-208dc4c7cc94
        name: 'gallery',
        url: '/3/gallery',
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
        url: '/3/gallery/search',
        args: [...sortWindowPageFilters, {name: 'q', type: '&'}]
      },
      { // https://apidocs.imgur.com/#f64e44be-8bf3-47bb-90d5-d1bf39c5e417
        // FIXME not tested
        name: 'galleryAlbum',
        url: '/3/gallery/album',
        args: [{name: 'galleryHash', type: '/'}]
      },
      { // https://apidocs.imgur.com/#6b97ac3f-0fbc-43d9-bb8e-47321ee6dc46
        // FIXME not tested
        name: 'galleryImage',
        url: '/3/gallery/image',
        args: [{name: 'galleryImageHash', type: '/'}]
      },
      { // https://apidocs.imgur.com/#0f89160b-8bb3-40c5-b17b-a02cc8a2f73d
        // FIXME not tested
        name: 'galleryTag',
        url: '/3/gallery/t',
        args: [{name: 'tagName', type: '/'}, ...sortWindowPageFilters]
      },
      { // https://apidocs.imgur.com/#57124d89-c27d-4def-8723-483242db09ee
        // FIXME not tested
        name: '/3/galleryItemTags',
        url: suffix => `gallery${suffix}/tags`,
        args: [{name: 'galleryHash', type: '/'}]
      },
      { // https://apidocs.imgur.com/#c94c8719-fe68-4854-b96d-70735dd8b2bc
        // FIXME not tested
        name: 'account',
        url: '/3/account',
        args: [{name: 'username', type: '/'}]
      },
      { // https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84
        name: 'accountImages',
        url: '/3/account/me/images',
        args: [],
        headers: ['bearer']
      },
    ];

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
    return {
      clientId: {'Authorization': `Client-ID ${this.clientId}`},
      bearer: {'Authorization': `Bearer ${this.token}`},
      json: {'Accept': 'application/vnd.api+json'},
    }[name];
  }
}