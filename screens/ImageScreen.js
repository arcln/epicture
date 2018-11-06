import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import AutoImage from 'react-native-auto-height-image';
import ImageStats from '../components/ImageStats';
import IconButton from '../components/IconButton';

export default class ImageScreen extends React.Component {

  static navigationOptions = {
    title: 'Image',
  };

  render() {
    return (
      <View style={styles.container}>
        <AutoImage
          source={require('../assets/images/robot-prod.png')}
          width={Dimensions.get('window').width}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{paddingLeft: 10}}>
            <ImageStats size={16} color='#000' />
          </View>
          <View style={{marginRight: 20}}>
            <IconButton
              size={30}
              color='#000'
              name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
            />
          </View>
        </View>
      </View>
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
