import Imgur from '../api/Imgur';
import User from '../api/User';
import ImgurConsts from '../constants/Imgur';

export default class extends Imgur {

    constructor(access_token) {
        super(ImgurConsts.clientId, ImgurConsts.clientSecret, access_token);
        User.onChange(user => user ? this.login(user.access_token) : this.logout());
    }
};