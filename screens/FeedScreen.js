import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';

export default class FeedScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params && navigation.state.params.title || 'Feed'}`,
  });

  sortBy = key => {
    this.props.navigation.setParams({title: key});
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageGrid
          itemPressed={() => this.props.navigation.navigate('Image')}
          sortOptions={['Popular', 'Trending', 'Newest', 'Cancel']}
          onSort={this.sortBy}
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
