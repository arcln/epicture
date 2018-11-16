import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';
import User from '../api/User';
import AuthImgur from '../api/AuthImgur';

export default class FavoritesScreen extends React.Component {

  page = 0;

  state = {
    data: [],
    user: {},
  }

  async componentDidMount() {
    await this.setState({user: await User.get()});
    this.imgur = new AuthImgur(this.state.user.access_token);
    this.fetchData();
  }

  static navigationOptions = ({navigation}) => {
    if (!navigation.state.params) {
      return {
        title: 'Favorites',
      };
    }

    return navigation.state.params;
  };

  async fetchData() {
    const res = await this.imgur.favorites({
      username: this.state.user.account_username,
      page: this.page,
    });
    console.log({
      username: this.state.user.account_username,
      page: this.page,
    })
    this.setState({data: [...this.state.data, ...res.data.data]});
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <ImageGrid
          itemPressed={(_, data) => this.props.navigation.push('Image', {data})}
          disableRowSizeSelect={!this.showViewOptions}
          data={this.state.data}
          itemsPerRow={1}
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
