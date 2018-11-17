import ApiBuilder from './ApiBuilder';

const sortWindowPageFilters = [
  {name: 'sort', type: '/'},
  {name: 'window', type: '/'},
  {name: 'page', type: '/'},
];

export default class extends ApiBuilder {

  constructor(clientId, clientSecret, token, errorHandler) {
    super({
      config: {
        baseURL: 'https://api.imgur.com',
        timeout: 10000,
      },
      routes: [
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
        {
          name: 'accountSubmissions',
          url: suffix => `/3/account${suffix}/submissions/0`,
          args: [{name: 'username', type: '/'}],
          headers: ['bearer'],
        },
        { // https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84
          name: 'accountImages',
          url: '/3/account/me/images',
          args: [],
          headers: ['bearer']
        },
        { // https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84
          name: 'upvote',
          url: suffix => `/3/gallery${suffix}/vote/up`,
          args: [{name: 'galleryHash', type: '/'}],
          headers: ['bearer'],
          httpMethod: 'post'
        },
        { // https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84
          name: 'downvote',
          url: suffix => `/3/gallery${suffix}/vote/down`,
          args: [{name: 'galleryHash', type: '/'}],
          headers: ['bearer'],
          httpMethod: 'post'
        },
        { // https://apidocs.imgur.com/#ee366f7c-69e6-46fd-bf26-e93303f64c84
          name: 'unvote',
          url: suffix => `/3/gallery${suffix}/vote/veto`,
          args: [{name: 'galleryHash', type: '/'}],
          headers: ['bearer'],
          httpMethod: 'post'
        },
        { // https://apidocs.imgur.com/#31c72664-59c1-426f-98d7-ac7ad6547cc2
          name: 'toogleFavorite',
          url: suffix => `/3/album${suffix}/favorite`,
          args: [{name: 'albumHash', type: '/'}],
          headers: ['bearer'],
          httpMethod: 'post'
        },
      ],
      headers: () => {
        let bearer = `Bearer ${this.token}`;
        return {
          clientId: {'Authorization': this.token ? bearer : `Client-ID ${this.clientId}`},
          bearer: {'Authorization': bearer},
          json: {'Accept': 'application/vnd.api+json'},
        };
      }
    });

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.errorHandler = errorHandler || (e => console.error(JSON.stringify(e.response && e.response.data || e)));
    this.headers = () => this.getHeader('clientId');
    this.login(token);
  }

  login(token) {
    this.token = token;
  }

  logout() {
    this.token = null;
  }

  toogleVote = async (vote, currentValue, id) => {
    if (currentValue == vote) {
      await this.unvote({galleryHash: id});
      return null;
    }
    await this[`${vote}vote`]({galleryHash: id});
    return vote;
  }

  getAuthUrl(redirectUrl) {
    return `https://api.imgur.com/oauth2/authorize?response_type=token` +
      `&client_id=${this.clientId}` +
      `&redirect_uri=${redirectUrl}`
  }
}
