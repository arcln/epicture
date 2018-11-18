import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Platform,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Clipboard,
} from 'react-native';
import FeedScreen from './FeedScreen';
import OptionsMenu from '../vendor/izzisolomon/PopupMenu';
import {Permissions, Icon} from 'expo';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import axios from 'axios';
import User from '../api/User';
import AutoImage from 'react-native-auto-height-image';

export default class UploadPromptScreen extends FeedScreen {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'New post',
      headerRight: (
        <View style={{paddingRight: 10}}>
          <Button
            title='Upload'
            onPress={() => navigation.state.params.upload()}
            disabled={
              !navigation.state.params ||
              !navigation.state.params.pick ||
              !navigation.state.params.title
            }
          />
        </View>
      ),
    };
  };

  state = {
    pick: null,
    title: '',
  };

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  componentDidMount() {
    if (!this.props.navigation) {
      return;
    }

    this.props.navigation.setParams({upload: () => this.upload()});
  }

  setTitle = async title => {
    const {params = {}} = this.props.navigation.state;
    await this.setState({title});

    if (title.length && (!params.title)) {
      this.props.navigation.setParams({title});
    }

    if (!title.length) {
      this.props.navigation.setParams({title});
    }
  };

  async upload() {
    this.props.navigation.navigate('Uploading', {
      setOnHide: ref => (this.hideLoader = ref),
    });

    const user = await User.get();
    const res = await axios.post(
      'https://api.imgur.com/3/image',
      {
        title: this.state.title,
        image: this.state.pick.base64,
        type: 'base64',
      },
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      },
    );

    this.hideLoader();

    if (res.status === 200) {
      const publish = () => {
        this.props.navigation.push('Share', {
          uri: this.state.pick.uri,
          title: this.state.title,
          imageHash: res.data.data.id,
          link: res.data.data.link,
        });
      };

      Alert.alert(
        'Upload success',
        'Your image is stored privately.',
        [
          {text: 'OK'},
          {text: 'Copy Link', onPress: () => Clipboard.setString(res.data.data.link)},
          {text: 'Publish', onPress: publish},
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Upload failed',
        'Please try again later.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }

  async go(somewhere) {
    let pick;

    if (!somewhere) {
      return;
    }

    if (somewhere === 'library') {
      const {status} = await Expo.Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        pick = await Expo.ImagePicker.launchImageLibraryAsync({
          mediaTypes: Expo.ImagePicker.MediaTypeOptions.Photos,
          base64: true,
        });
      }
    } else if (somewhere === 'camera') {
      const {status} = await Expo.Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
      );
      if (status === 'granted') {
        pick = await Expo.ImagePicker.launchCameraAsync({
          mediaTypes: Expo.ImagePicker.MediaTypeOptions.Photos,
          base64: true,
        });
      }
    }

    console.log(pick);
    if (pick.base64) {
      await this.setState({pick});
      this.props.navigation.setParams({pick: true});
    }
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='dark-content' />
        <OptionsMenu
          options={['From camera', 'From library', ...(Platform.OS === 'ios' ? ['Cancel'] : [])]}
          ref={menu => (this.menu = menu)}
          actions={[
            () => this.go('camera'),
            () => this.go('library'),
            () => this.go(null),
          ]}
        />
        <View style={{padding: 20}}>
          <TextInput
            style={{fontSize: 24}}
            onChangeText={this.setTitle}
            value={this.state.title}
            placeholder='Title'
          />
        </View>
        <TouchableOpacity onPress={() => this.menu.prompt()}>
          {this.state.pick ? (
            <View>
              <AutoImage
                source={{uri: this.state.pick.uri}}
                width={Dimensions.get('window').width}
              />
            </View>
          ) : (
              <View style={styles.placeholder}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Icon.Ionicons
                    size={24}
                    color='#000'
                    name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'}
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text>Choose picture</Text>
                </View>
              </View>
            )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: {
    margin: 20,
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    justifyContent: 'center',
    height: 200,
  },
});
