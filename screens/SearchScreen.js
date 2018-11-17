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
import Selector from '../components/Selector';
import Colors from '../constants/Colors';

export default class SearchScreen extends React.Component {

  state = {
    query: '',
    sort: 'time',
    window: 'all',
  };

  searchTriggerTimeout = null;

  static navigationOptions = ({navigation}) => ({
  });

  search = () => {
    if (!query.length) {
      return;
    }

    console.log('search', this.state);
  };

  refreshTrigger = forceUpdate => {
    if (this.searchTriggerTimeout) {
      clearTimeout(this.searchTriggerTimeout);
    }

    if (forceUpdate) {
      this.search();
    } else {
      this.searchTriggerTimeout = setTimeout(this.search, 1000);
    }
  };

  selectorChanged = async (selector, value) => {
    const valueToKey = value => {
      switch (value) {
        case 'Most recent': return 'time';
        case 'Viral': return 'viral';
        case 'Top': return 'top';
        case 'Today': return 'day';
        case 'This week': return 'week';
        case 'This month': return 'month';
        case 'This year': return 'year';
        case 'All time': return 'all';
        default: return '';
      }
    };

    await this.setState({[selector]: valueToKey(value)});
    this.refreshTrigger(true);
  };

  queryChanged = async query => {
    await this.setState({query});
    this.refreshTrigger();
  };

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
              onChangeText={this.queryChanged}
              value={this.state.query}
              placeholder='Search Imgur'
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
          <Selector
            style={{marginRight: 10}}
            options={['Most recent', 'Viral', 'Top']}
            default='Most recent'
            onChange={value => this.selectorChanged('sort', value)}
          />
          <Selector
            options={['Today', 'This week', 'This month', 'This year', 'All time']}
            default='All time'
            onChange={value => this.selectorChanged('window', value)}
          />
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
