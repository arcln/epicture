import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';

export default class FeedScreen extends React.Component {

  page = 1;

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

  setQuery = query => {
    this.query = query;
    this.fetchData();
  };

  fetchData = async () => {
    const res = await this.imgur.gallery({
      ...this.query,
      page: this.page,
    });
    console.log({
      ...this.query,
      page: this.page,
    })
    this.setState({data: [...this.state.data, ...res.data.data]});
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
          sortOptions={this.showViewOptions ? ['Popular', 'Trending', 'User Submitted'] : null}
          disableRowSizeSelect={!this.showViewOptions}
          onSort={this.sortBy}
          data={this.state.data}
          itemsPerRow={this.itemsPerRow}
          onEnd={() => {
            console.log('ok')
            this.page += 1;
            this.fetchData(this.page);
          }}
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
