import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {AuthSession, LinearGradient} from 'expo';
import User from '../api/User';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';

export default class LandingScreen extends React.Component {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  state = {
    user: {},
  }

  async componentDidMount() {
    await this.setState({user: await User.get()});
  }

  async login() {
    let user = this.state.user;

    if (!user) {
      let redirectUrl = encodeURIComponent(AuthSession.getRedirectUrl());
      user = (await AuthSession.startAsync({
          authUrl: this.imgur.getAuthUrl(redirectUrl),
        })).params;
      User.set(user);
    } else {
      console.log('already logged as ' + user.account_username);
    }

    this.props.onLogged(user);
  }

  render() {
    return (
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
