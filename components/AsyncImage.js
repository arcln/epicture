import React from 'react';
import {View, Image} from 'react-native';

export default class AsyncImage extends React.Component {

  state = {
    loaded: false,
  };

  render() {
    return (
      <View>
        <Image
          style={this.props.style}
          source={this.props.source}
          onLoad={() => this.setState({loaded: true})}
        />
        {!this.state.loaded && this.props.placeholder}
      </View>
    )
  }
}