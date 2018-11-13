import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import {StatusBar} from 'react-native';
import AutoImage from 'react-native-auto-height-image';
import { AuthSession } from 'expo';

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
    await this.initImgur();
  }

  async initImgur() {
    let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
    console.log(this.imgur.getAuthUrl(redirectUrl));
    let user = (await AuthSession.startAsync({
        authUrl: this.imgur.getAuthUrl(redirectUrl),
      })).params;

    this.imgur.login(user.access_token)
    let accountImages = await this.imgur.accountImages();
    console.log(accountImages.data.data);
    console.log('user-------------------->', user);
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
