import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import {StatusBar} from 'react-native';
import AutoImage from 'react-native-auto-height-image';

export default class HomeScreen extends FeedScreen {

  imgur = new Imgur('a1c2ed557be8cb8', '10f63ce8eff4619b18579af0ef4ef71bd6d8b400');

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
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
