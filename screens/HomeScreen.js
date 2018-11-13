import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import {StatusBar, AsyncStorage} from 'react-native';
import AutoImage from 'react-native-auto-height-image';
import {AuthSession} from 'expo';

export default class HomeScreen extends FeedScreen {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  async componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: <AutoImage
        source={require('../assets/images/logo.png')}
        width={100}
      />
    });
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    const res = await this.imgur.gallery({section: 'hot'});
    this.setState({data: res.data.data});
    await this.login();
  }

  async login() {
    let user = JSON.parse(await AsyncStorage.getItem('user'));

    if (!user) {
      let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
       user = (await AuthSession.startAsync({
          authUrl: this.imgur.getAuthUrl(redirectUrl),
        })).params;
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      console.log('already logged as ' + user.account_username);
    }

    this.imgur.login(user.access_token)
  }

  async logout() {
    this.imgur.login(null);
    await AsyncStorage.removeItem('user');
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
