import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import AutoImage from 'react-native-auto-height-image';
import AsyncImage from '../components/AsyncImage';
import ImageStats from '../components/ImageStats';
import IconButton from '../components/IconButton';

export default class ImageScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params && navigation.state.params.title || 'Image',
  });

  state = {
    data: this.props.navigation.state.params && this.props.navigation.state.params.data || {},
  };

  componentDidMount() {
    this.props.navigation.setParams({title: this.state.data.title})
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <AsyncImage
          source={{uri: this.state.data.images[0].link}}
          width={this.state.itemWidth}
          style={{
            width: Dimensions.get('window').width,
          }}
        />
        {/* <AutoImage
          source={{uri: this.state.data.images[0].link}}
          width={Dimensions.get('window').width}
        /> */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
          <View style={{paddingLeft: 10}}>
            <ImageStats size={16} color='#000' data={this.state.data} />
            <Text
              style={{paddingLeft: 3}}>Posted by&nbsp;
              <Text
                style={{fontWeight: 'bold'}}
                onPress={() => this.props.navigation.push('Profile', {account: this.state.data.account_url})}
              >@{this.state.data.account_url}</Text>
            </Text>
          </View>
          <View style={{marginRight: 20}}>
            <IconButton
              size={30}
              color='#000'
              name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '40%',
  }
});
