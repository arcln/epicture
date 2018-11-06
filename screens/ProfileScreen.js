import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
} from 'react-native';
import ImageGrid from '../components/ImageGrid';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
    headerRight: (
      <View style={{paddingRight: 10}}>
        <Button title='Upload' onPress={() => {}} />
      </View>
    )
  };

  componentDidMount() {
    this.props.navigation.setParams({title: 'tes'});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.accountInfoContainer, {flexDirection: 'row'}]}>
          <View style={[styles.profileContainer, {flex: 2, flexDirection: 'row', justifyContent: 'center'}]}>
            <Image
              source={require('../assets/images/robot-prod.png')}
              style={styles.profilePicture}
            />
          </View>
          <View style={{flex: 4, justifyContent: 'center'}}>
            <Text style={styles.accountName}>Arthur Chaloin</Text>
            <Text style={styles.accountEmail}>arthur.chaloin@epitech.eu</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ImageGrid />
        </View>
      </View >
    );
  }

  // _maybeRenderDevelopmentModeWarning() {
  //   if (__DEV__) {
  //     const learnMoreButton = (
  //       <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
  //         Learn more
  //       </Text>
  //     );

  //     return (
  //       <Text style={styles.developmentModeText}>
  //         Development mode is enabled, your app will be slower but you can use useful development
  //         tools. {learnMoreButton}
  //       </Text>
  //     );
  //   } else {
  //     return (
  //       <Text style={styles.developmentModeText}>
  //         You are not in development mode, your app will run at full speed.
  //       </Text>
  //     );
  //   }
  // }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

  // _handleHelpPress = () => {
  //   WebBrowser.openBrowserAsync(
  //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
  //   );
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // maxHeight: 140,
  },
  accountInfoContainer: {
    // backgroundColor: '#fff',
    // backgroundColor: 'red',
  },
  profileContainer: {
    padding: 20,
  },
  profilePicture: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  accountName: {
    fontSize: 24,
    // fontWeight: '200',
  },
  accountEmail: {
    fontSize: 14,
  },
});
