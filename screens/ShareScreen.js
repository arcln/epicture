import React from 'react';
import {
  View,
  ScrollView,
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
  ActivityIndicator,
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
    const backBtn = navigation.state.params.loading ? {headerLeft: null} : {};
    return {
      title: navigation.state.params.title || 'New post',
      ...backBtn,
      headerRight: (
        <View style={{paddingRight: 10}}>
          {
            navigation.state.params.loading ? (<ActivityIndicator animating={true} />) : (
              <Button
                title='Publish'
                onPress={() => navigation.state.params.publish()}
                disabled={!navigation.state.params || !navigation.state.params.topic}
              />
            )
          }
        </View>
      ),
    };
  };

  state = {
    topic: '',
    tags: [],
    tagsString: '',
  };

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  async componentDidMount() {
    this.props.navigation.setParams({publish: () => this.publish()});
    this.imgur.login((await User.get()).access_token);
  }

  setTopic = async topic => {
    const {params = {}} = this.props.navigation.state;
    await this.setState({topic});

    if (topic.length && (!params.topic)) {
      this.props.navigation.setParams({topic});
    }

    if (!topic.length) {
      this.props.navigation.setParams({topic});
    }
  };

  setTags = async tagsString => {
    const tags = tagsString.split(',');
    await this.setState({tags, tagsString});
    this.props.navigation.setParams({tags});
  };

  async publish() {
    let res;

    this.props.navigation.setParams({loading: true});
    try {
      res = await axios.post(
        `https://api.imgur.com/3/gallery/image/${this.props.navigation.state.params.imageHash}`,
        {
          title: this.props.navigation.state.params.title,
          topic: this.state.topic,
          tags: this.state.tagsString,
        },
        {
          headers: {
            Authorization: `Bearer ${(await User.get()).access_token}`,
          },
        },
      );
    } catch (e) {
      this.props.navigation.goBack();
      Alert.alert(
        'Share failed',
        'Please try again later.',
        [{text: 'OK'}],
        {cancelable: false},
      );
      return;
    }
    this.props.navigation.goBack();
    Alert.alert(
      'Success',
      'Your image will be soon in the gallery!',
      [{text: 'OK'}, {text: 'Copy Link', onPress: () => Clipboard.setString(this.props.navigation.state.params.link)}],
      {cancelable: false},
    );
  }

  render() {
    return (
      <ScrollView>
        <StatusBar barStyle='dark-content' />
        <AutoImage
          source={{uri: this.props.navigation.state.params.uri}}
          width={Dimensions.get('window').width}
        />
        <View style={{padding: 20}}>
          <TextInput
            style={{fontSize: 24}}
            onChangeText={this.setTopic}
            value={this.state.topic}
            placeholder='Topic'
          />
          <TextInput
            style={{fontSize: 18, paddingTop: 10}}
            onChangeText={this.setTags}
            value={this.state.tagsString}
            placeholder='Tags (comma separated)'
          />
        </View>
      </ScrollView>
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
