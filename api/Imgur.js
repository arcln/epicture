import axios from 'axios';

export default class {
    constructor(clientId, clientSecret, errorHandler) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.errorHandler = errorHandler || console.error;
        this.axios = axios.create({
            baseURL: 'https://api.imgur.com/3',
            timeout: 1000,
            headers: {'Authorization': `Client-ID ${this.clientId}`}
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

    async gallery(opts={}) {
        let args = [
            {name: 'section',   type: '/'},
            {name: 'sort',      type: '/'},
            {name: 'window',    type: '/'},
            {name: 'page',      type: '/'},
            {name: 'showViral', type: '&'},
            {name: 'mature',    type: '&'},
            {name: 'album_previews',  type: '&'},
        ];

        let query = this.buildQuery('gallery', opts, args);
        console.log('query:', query);
        return this.axios.get(query)
            .catch(this.errorHandler);
    }
}