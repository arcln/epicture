import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import {AuthSession, LinearGradient} from 'expo';
import User from '../api/User';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import AutoImage from 'react-native-auto-height-image';

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
        <StatusBar barStyle='light-content' />
        <LinearGradient
          colors={['#2e2e82', '#171544']}
          style={styles.container}>
          <View style={styles.greeting}>
            <Text style={{color: '#fff'}}>Welcome to</Text>
            <AutoImage
              source={require('../assets/images/logo.png')}
              width={300}
            />
          </View>
          <View>
            <Button
              onPress={() => this.login()}
              title="Login"
              color="#1bb76e"
              style={{flex: 5}}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    alignItems: 'center',
    height: 300,
    marginTop: 90,
  }
});
