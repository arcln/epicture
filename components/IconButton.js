import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Icon} from 'expo';
import Colors from '../constants/Colors';

export default class IconButton extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Icon.Ionicons
          name={this.props.name}
          style={{color: this.props.color || Colors.tintColor}}
          size={this.props.size || 24}
        />
      </TouchableHighlight>
    );
  }
}
