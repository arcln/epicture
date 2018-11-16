import React from 'react';
import {StyleSheet, View, Button, Text, StatusBar} from 'react-native';
import {AuthSession, LinearGradient} from 'expo';
import User from '../api/User';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import AutoImage from 'react-native-auto-height-image';

export default class UploadingScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    navigation.state.params &&
      navigation.state.params.setOnHide(() => navigation.goBack());
    return {};
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <LinearGradient colors={['#000', '#000']} style={styles.container}>
          <View style={styles.greeting}>
            <AutoImage
              source={require('../assets/images/loader.gif')}
              width={300}
            />
            <Text style={{color: '#fff', marginTop: 100}}>
              Your image is being processed...
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

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
  },
});
