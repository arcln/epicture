import React from 'react';
import FeedScreen from './FeedScreen';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import OptionsMenu from '../vendor/izzisolomon/PopupMenu';
import {Icon} from 'expo';

export default class HomeScreen extends FeedScreen {

  componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      this.menu.prompt();
    });
  }

  goto(where) {
    console.log(where);
  }

  render() {
    return (
      <OptionsMenu
        options={['From camera', 'From library', 'Cancel']}
        ref={menu => this.menu = menu}
        actions={[
          () => this.goto('camera'),
          () => this.goto('library'),
          () => null
        ]} />
    );
  }
};
