import React from 'react';
import {View, Text, Platform} from 'react-native';
import OptionsMenu from 'react-native-options-menu';
import {Icon} from 'expo';
import Colors from '../constants/Colors';

export default class Selector extends React.Component {

  state = {
    value: this.props.default || '',
  }

  itemPressed = async value => {
    await this.setState({value});
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    console.log(Array(this.props.options.length))
    return (
      <OptionsMenu
        options={[...this.props.options, 'Cancel']}
        customButton={(
          <View style={{flexDirection: 'row'}}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-arrow-down' : 'md-arrow-down'}
              style={{color: Colors.tintColor, paddingTop: 3}}
            />
            <Text style={{color: Colors.tintColor}}> {this.state.value}</Text>
          </View>
        )}
        actions={[
          ...Array(this.props.options.length).fill().map((_, idx) => () => this.itemPressed(this.props.options[idx])),
          _ => null
        ]} />
    );
  }
}
