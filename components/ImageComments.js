import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Button,
} from 'react-native';

import ImageGrid from '../components/ImageGrid';
import User from '../api/User';
import AuthImgur from '../api/AuthImgur';
import Colors from '../constants/Colors';

export default class FavoritesScreen extends React.Component {

  state = {
    data: [],
    user: {},
    comment: '',
    postButtonHeight: 0,
  }

  async componentWillMount() {
    await this.setState({user: await User.get()});
    this.imgur = new AuthImgur(this.state.user.access_token);
    await this.fetchData();
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

  async comment() {
    let res = await this.imgur.comment({image_id: this.props.galleryHash, comment: this.state.comment});
    this.setState({
      data: [{author: this.state.user.account_username, comment: this.state.comment}, ...this.state.data],
      comment: '',
    });
  }

  async fetchData() {
    const res = await this.getComments();
    this.setState({data: res.data.data});
  };

  onCommentChange = (comment) => {
    if (this.state.comment == '')
      this.setState({postButtonHeight: null});
    else if (comment == '')
      this.setState({postButtonHeight: 0});

    this.setState({comment});
  }

  renderComment = (comment, idx) => (
    <View style={styles.commentItem} key={idx}>
      <Text style={{fontWeight: 'bold', marginBottom: 2}}>{comment.author}</Text><Text>{comment.comment}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.commentInput}
          multiline={true}
          numberOfLines={3}
          placeholder='Write a comment!'
          maxLength={140}
          onChangeText={this.onCommentChange}
          value={this.state.comment}/>
        <View style={[styles.commentButton, {height: this.state.postButtonHeight}]}>
          <Button
            onPress={() => this.comment()}
            title="Post"
            color="#1bb76e"
          />
        </View>
        <View style={styles.commentList}>
          {this.state.data.map(this.renderComment)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
  },
  commentInput : {
    backgroundColor: 'white',
    padding: 5,
    textAlignVertical: 'top',
  },
  commentButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginTop: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  commentList: {
    flexDirection: 'column',
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
