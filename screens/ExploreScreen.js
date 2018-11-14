import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import {StatusBar} from 'react-native';
import AutoImage from 'react-native-auto-height-image';
import Credentials from '../constants/Credentials';

export default class ExploreScreen extends FeedScreen {

  imgur = new Imgur(Credentials.cliendId, Credentials.cliendSecret);

  showViewOptions = true;

  itemsPerRow = 2;

  async componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.setQuery({section: 'hot'});
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
