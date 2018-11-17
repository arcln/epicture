import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import AutoImage from 'react-native-auto-height-image';
import AsyncImage from '../components/AsyncImage';
import ImageStats from '../components/ImageStats';
import IconButton from '../components/IconButton';
import User from '../api/User';
import AuthImgur from '../api/AuthImgur';

export default class ImageScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params && navigation.state.params.title || 'Image',
  });

  state = {
    data: this.props.navigation.state.params && this.props.navigation.state.params.data || {},
    favorite: this.props.navigation.state.params.data.favorite,
  };

  async componentDidMount() {
    const user = await User.get();
    this.imgur = new AuthImgur(user.access_token);

    this.props.navigation.setParams({title: this.state.data.title})
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  async toogleFavorite(id) {
    let data = (await this.imgur.toogleFavorite({albumHash: id})).data.data;
    await this.setState({favorite: data == 'favorited'});
    this.props.navigation.state.params.data.favorite = this.state.favorite;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle='dark-content' />
        {this.state.data.images.map((image, idx) => (
          <AsyncImage
            key={idx}
            source={{uri: image.link}}
            width={this.state.itemWidth}
            style={{
              width: Dimensions.get('window').width,
            }}
          />
        ))}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
          <View style={{paddingLeft: 10}}>
            <ImageStats size={16} color='#000' data={this.state.data} />
            <Text
              style={{paddingLeft: 3}}>Posted by&nbsp;
              <Text
                style={{fontWeight: 'bold'}}
                onPress={() => this.props.navigation.push('Profile', {account: this.state.data.account_url})}
              >@{this.state.data.account_url}</Text>
            </Text>
          </View>
          <View style={{marginRight: 20}}>
            <IconButton
              size={30}
              color={this.state.favorite ? 'red' : '#000'}
              onPress={() => this.toogleFavorite(this.state.data.id)}
              name={(Platform.OS === 'ios' ? 'ios-heart' : 'md-heart') + (this.state.favorite ? '' : '-empty')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '40%',
  }
});
