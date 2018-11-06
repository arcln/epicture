import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Image,
  Text,
} from 'react-native';
import ImageGrid from '../components/ImageGrid';
import Imgur from '../api/Imgur';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
    headerRight: (
      <View style={{paddingRight: 10}}>
        <Button title='Upload' onPress={() => {}} />
      </View>
    )
  };

  render() {
    return (
      <ScrollView style={styles.container}>
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
          <ImageGrid
            itemPressed={() => this.props.navigation.navigate('Image')}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    // maxHeight: 140,
  },
  accountInfoContainer: {
    backgroundColor: '#fff',
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
