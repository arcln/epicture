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
    this.fetchData(true);
  };

  fetchData = async reset => {
    const res = await this.imgur.gallery({
      ...this.query,
      page: this.page,
    });

    this.setState({data: [...(reset ? [] : this.state.data), ...res.data.data]});
  };

  sortBy = sort => {
    this.setQuery((() => {
      switch (sort) {
        case 'Popular': return {section: 'top'};
        case 'Trending': return {section: 'user', sort: 'rising'};
        case 'User Submitted': return {section: 'user'};
        default: return {section: 'hot'};
      }
    })());
    console.log((() => {
      switch (sort) {
        case 'Popular': return {section: 'top'};
        case 'Trending': return {section: 'user', sort: 'rising'};
        case 'User Submitted': return {section: 'user'};
        default: return {section: 'hot'};
      }
    })())
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
            this.page += 1;
            this.fetchData();
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
