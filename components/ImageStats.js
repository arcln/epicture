import React from 'react';
import {
  View,
  Text,
  Platform,
} from 'react-native';
import IconButton from '../components/IconButton';

export default class ImageStats extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{paddingLeft: 5, flexDirection: 'row'}}>
          <IconButton
            size={this.props.size + 8}
            color={this.props.color}
            name={Platform.OS === 'ios' ? 'ios-arrow-round-up' : 'md-arrow-round-up'}
          />
          <View style={{justifyContent: 'center', paddingLeft: 5}}>
            <Text style={{fontSize: this.props.size, color: this.props.color}}>342</Text>
          </View>
        </View>
        <View style={{paddingLeft: 10, flexDirection: 'row'}}>
          <IconButton
            size={this.props.size + 8}
            color={this.props.color}
            name={Platform.OS === 'ios' ? 'ios-arrow-round-down' : 'md-arrow-round-down'}
          />
          <View style={{justifyContent: 'center', paddingLeft: 5}}>
            <Text style={{fontSize: this.props.size, color: this.props.color}}>6</Text>
          </View>
        </View>
        <View style={{paddingLeft: 10, paddingRight: 5, flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <IconButton
              size={this.props.size + 4}
              color={this.props.color}
              name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
            />
          </View>
          <View style={{justifyContent: 'center', paddingLeft: 6}}>
            <Text style={{fontSize: this.props.size, color: this.props.color}}>2735</Text>
          </View>
        </View>
      </View>
    );
  }
}
