import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import {
  StatusBar,
} from 'react-native';
import AutoImage from 'react-native-auto-height-image';

export default class HomeScreen extends FeedScreen {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  showViewOptions = false;

  itemsPerRow = 1;

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

    this.setQuery({section: 'hot'});
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
