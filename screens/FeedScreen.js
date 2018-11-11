import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';

export default class FeedScreen extends React.Component {

  state = {
    data: [],
    user: {},
  }

  static navigationOptions = ({navigation}) => {
    if (!navigation.state.params) {
      return {
        title: 'Explore',
      };
    }

    return navigation.state.params;
  };

  sortBy = key => {
    this.props.navigation.setParams({title: key});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <ImageGrid
          itemPressed={(_, data) => this.props.navigation.push('Image', {data})}
          sortOptions={this.showViewOptions ? ['Popular', 'Trending', 'User Submitted', 'Cancel'] : null}
          disableRowSizeSelect={!this.showViewOptions}
          onSort={this.sortBy}
          data={this.state.data}
          itemsPerRow={this.itemsPerRow}
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
