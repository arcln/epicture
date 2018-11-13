import React from 'react';
import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import {
  StatusBar,
  AsyncStorage,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {AuthSession, LinearGradient} from 'expo';
import AutoImage from 'react-native-auto-height-image';

export default class HomeScreen extends FeedScreen {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  async componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: <AutoImage
        source={require('../assets/images/logo.png')}
        width={100}
      />
    });
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    await this.setState({user: await this.getUser()});
    if (this.state.user)
      this.login();
    const res = await this.imgur.gallery({section: 'hot'});
    this.setState({data: res.data.data});
  }

  async login() {
    let user = this.state.user;

    if (!user) {
      let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
       user = (await AuthSession.startAsync({
          authUrl: this.imgur.getAuthUrl(redirectUrl),
        })).params;
      AsyncStorage.setItem('user', JSON.stringify(user));
      await this.setState({user: user});
    } else {
      console.log('already logged as ' + user.account_username);
    }

    this.imgur.login(user.access_token)
  }

  async logout() {
    this.imgur.login(null);
    await AsyncStorage.removeItem('user');
  }

  async getUser() {
    return JSON.parse(await AsyncStorage.getItem('user'));
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    return this.state.user ? super.render() : (
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#2e2e82', '#171544']}
          style={styles.container}>
          <Button
            onPress={() => this.login()}
            title="Login with Imgur"
            color="#1bb76e"
          />
        </LinearGradient>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
