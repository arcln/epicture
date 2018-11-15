import React from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icon} from 'expo';

export default class SearchScreen extends React.Component {

  state = {
    query: '',
  }

  static navigationOptions = ({navigation}) => ({
  });

  componentWillMount() {
    this.navListener = this.props.navigation && this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  render() {
    return (
      <View>
        <View style={{paddingTop: getStatusBarHeight(), backgroundColor: '#fff'}}>
          <View style={styles.searchBar}>
            <Icon.Ionicons
              size={24}
              color='#ccc'
              style={{paddingRight: 10}}
              name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
            />
            <TextInput
              style={{fontSize: 18}}
              onChangeText={(query) => this.setState({query})}
              value={this.state.query}
              placeholder='Search Imgur'
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#888',
  },
});
