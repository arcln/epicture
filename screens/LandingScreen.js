import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
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
    landingOpacity: new Animated.Value(0.0),
    splashOpacity: new Animated.Value(1.0),
    btnOpacity: new Animated.Value(0.0),
    textOpacity: new Animated.Value(0.0),
    logoPos: new Animated.Value(0.0),
    done: false,
  }

  async componentDidMount() {
    await this.setState({
      btnOpacity: new Animated.Value(0.0),
    });
    await this.setState({user: await User.get()});

    let {
      splashOpacity,
      landingOpacity,
      btnOpacity,
      textOpacity,
      logoPos,
    } = this.state;

    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(landingOpacity, {
          toValue: 1.0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(splashOpacity, {
          toValue: 0.0,
          duration: 1000,
        }),
      ]),
      Animated.parallel([
        Animated.timing(logoPos, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(textOpacity, {
          toValue: 1.0,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
        Animated.timing(btnOpacity, {
          toValue: 1.0,
          duration: 500,
          delay: 600,
          useNativeDriver: true,
        }),
      ]),
    ]);

    setTimeout(() => animation.start(() => this.setState({done: true})), 1500);
  }

  async login() {
    console.log('ok');
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
        <Animated.View style={{opacity: this.state.landingOpacity}}>
          <LinearGradient
            colors={['#2e2e82', '#171544']}
            style={{
              position: 'absolute',
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          />
        </Animated.View>
        <View style={styles.container}>
          <Animated.View style={{opacity: this.state.landingOpacity, ...styles.container, flex: 2}}>
            <Animated.View style={[styles.greeting, {
              position: 'absolute', top: Dimensions.get('window').height / 2 - 68, transform: [
                {translateY: this.state.logoPos}
              ]
            }]}>
              <AutoImage
                source={require('../assets/images/splash-inverted.png')}
                width={Dimensions.get('window').width}
              />
            </Animated.View>
          </Animated.View>
          <Animated.View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            opacity: this.state.btnOpacity,
            paddingBottom: Dimensions.get('window').height / 4,
          }}>
            <Button
              onPress={() => this.login()}
              title="Login"
              color="#1bb76e"
              // disabled={this.state.btnOpacity == 0.0}
              style={{flex: 5}}
            />
          </Animated.View>
        </View>
        <Animated.View style={{
          position: 'absolute',
          top: Dimensions.get('window').height / 4 * 2 - 30,
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          justifyContent: 'center',
          opacity: this.state.textOpacity,
        }}>
          <Text style={{color: '#fff'}}>The magic of the internet</Text>
        </Animated.View>
        <Animated.View style={{
          opacity: this.state.splashOpacity,
          position: 'absolute',
          top: Dimensions.get('window').height / 2 - 68,
          transform: [{translateY: this.state.done ? -1000 : 0}],
        }}>
          <View style={styles.container}>
            <View style={styles.greeting}>
              <AutoImage
                source={require('../assets/images/splash.png')}
                width={Dimensions.get('window').width}
              />
            </View>
          </View>
        </Animated.View>
      </View >
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'space-around',
    justifyContent: 'space-around',
  },
  greeting: {
    alignItems: 'center',
    height: 300,
  }
});
