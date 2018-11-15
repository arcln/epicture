import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeedScreen from './FeedScreen';
import OptionsMenu from '../vendor/izzisolomon/PopupMenu';
import {Permissions, Icon} from 'expo';

export default class UploadPromptScreen extends FeedScreen {

  static navigationOptions = {
    title: 'Upload',
    headerRight: <Button title='Post' />
  };

  async go(somewhere) {
    let res;

    if (!somewhere) {
      return;
    }

    if (somewhere === 'library') {
      const {status} = await Expo.Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        res = await Expo.ImagePicker.launchImageLibraryAsync({
          mediaTypes: Expo.ImagePicker.MediaTypeOptions.All,
        });
      }
    } else if (somewhere === 'camera') {
      const {status} = await Expo.Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        res = await Expo.ImagePicker.launchCameraAsync();
      }
    }

    console.log(res);
  }

  render() {
    return (
      <View>
        <OptionsMenu
          options={['From camera', 'From library', 'Cancel']}
          ref={menu => this.menu = menu}
          actions={[
            () => this.go('camera'),
            () => this.go('library'),
            () => this.go(null),
          ]} />
        <TouchableOpacity onPress={() => this.menu.prompt()}>
          <View style={styles.placeholder}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon.Ionicons
                size={24}
                color='#000'
                name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>Add photo / video</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  placeholder: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    justifyContent: 'center',
    height: 200,
  },
});