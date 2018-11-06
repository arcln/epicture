import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Trending',
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageGrid
          itemPressed={() => this.props.navigation.navigate('Image')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
