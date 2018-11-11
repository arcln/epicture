import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import {StatusBar} from 'react-native';
import AutoImage from 'react-native-auto-height-image';

export default class ExploreScreen extends FeedScreen {

  imgur = new Imgur('a1c2ed557be8cb8', '10f63ce8eff4619b18579af0ef4ef71bd6d8b400');

  showViewOptions = true;

  itemsPerRow = 2;

  async componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    const res = await this.imgur.gallery({section: 'hot'});
    this.setState({data: res.data.data});
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
