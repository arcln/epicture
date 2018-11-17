import React from 'react';
import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icon} from 'expo';
import Selector from '../components/Selector';
import Imgur from '../api/Imgur';
import ImgurConsts from '../constants/Imgur';
import ImageGrid from '../components/ImageGrid';

export default class SearchScreen extends React.Component {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  state = {
    query: '',
    sort: 'time',
    window: 'all',
    data: [],
    loading: false,
  };

  searchTriggerTimeout = null;

  static navigationOptions = ({navigation}) => ({
  });

  search = async () => {
    if (!this.state.query.length) {
      return;
    }

    await this.setState({loading: true});

    const {data: {status, data}} = await this.imgur.gallerySearch({
      q: this.state.query,
      sort: this.state.sort,
      window: this.state.window,
    });

    if (status === 200) {
      this.setState({data});
    }

    await this.setState({loading: false});
  };

  refreshTrigger = forceUpdate => {
    if (this.searchTriggerTimeout) {
      clearTimeout(this.searchTriggerTimeout);
    }

    if (forceUpdate) {
      this.search();
    } else {
      this.searchTriggerTimeout = setTimeout(this.search, 500);
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
        <StatusBar barStyle='dark-content' />
        <View style={{paddingTop: getStatusBarHeight(), backgroundColor: '#fff'}}>
          <View style={styles.searchBar}>
            {
              !this.state.loading ? (
                <Icon.Ionicons
                  size={20}
                  style={{marginRight: 5}}
                  color='#ccc'
                  name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
                />
              ) : (<ActivityIndicator animating={true} />)
            }
            <TextInput
              style={{fontSize: 18, marginLeft: 10}}
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
        <View>
          <ImageGrid
            itemPressed={(_, data) => this.props.navigation.push('Image', {data})}
            sortOptions={null}
            data={this.state.data}
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
