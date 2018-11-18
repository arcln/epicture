import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';
import User from '../api/User';
import AuthImgur from '../api/AuthImgur';
import Colors from '../constants/Colors';

export default class FavoritesScreen extends React.Component {

  state = {
    data: [],
    user: {},
  }

  async componentDidMount() {
    await this.setState({user: await User.get()});
    this.imgur = new AuthImgur(this.state.user.access_token);
    await this.fetchData();
  }

  componentWillMount() {
    this.navListener = this.props.navigation && this.props.navigation.addListener('didFocus', async () => {
      if (!this.imgur)
        return;
      let res = await this.getComments();
      this.setState({data: res.data.data});
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }


  static navigationOptions = ({navigation}) => {
    if (!navigation.state.params) {
      return {
        title: 'Favorites',
      };
    }

    return navigation.state.params;
  };

  async getComments() {
    return await this.imgur.getComments({galleryHash: this.props.galleryHash});
  }

  async fetchData() {
    const res = await this.getComments();
    this.setState({data: res.data.data});
  };

  renderComment = (comment, idx) => (
    <View style={styles.commentItem} key={idx}>
      <Text style={{fontWeight: 'bold', marginBottom: 2}}>{comment.author}</Text><Text>{comment.comment}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.commentList}>
        {this.state.data.map(this.renderComment)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentList: {
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
    paddingTop: 5,
    paddingBottom: 5,
  },
  commentItem: {
    backgroundColor: 'white',
    margin: 5,
    marginLeft: 6,
    marginRight: 6,
    padding: 10,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 3,
  },
});
