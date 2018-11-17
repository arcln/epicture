import React from 'react';
import {Dimensions, Image, Animated, View} from 'react-native';
import {Rect} from 'react-native-svg';
// import ContentLoader from 'react-native-content-loader';

export default class AsyncImage extends React.Component {

  state = {
    height: 0,
    imageOpacity: new Animated.Value(0.0),
    placeholderOpacity: new Animated.Value(1.0),
  };

  imageLoaded = () => {
    let {
      placeholderOpacity,
      imageOpacity,
    } = this.state;

    Animated.parallel([
      Animated.timing(placeholderOpacity, {
        toValue: 0.0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacity, {
        toValue: 1.0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  componentDidMount() {
    if (!this.props.style.height) {
      Image.getSize(this.props.source.uri, (width, height) => {
        const screenWidth = Dimensions.get('window').width
        const scaleFactor = width / screenWidth
        const imageHeight = height / scaleFactor;
        this.setState({height: imageHeight});
      });
    }
  }

  render() {
    return (
      <Animated.View>
        <Animated.Image
          style={[{height: this.state.height}, this.props.style, {opacity: this.state.imageOpacity}]}
          source={this.props.source}
          onLoad={this.imageLoaded}
        />
        {/* <Animated.View style={{position: 'absolute', opacity: this.state.placeholderOpacity, zIndex: -1000}}>
          <View style={{
            height: this.props.width,
            width: this.props.width,
            backgroundColor: '#ededed',
          }}>
          </View>
        </Animated.View> */}
      </Animated.View >
    )
  }
}