import FeedScreen from './FeedScreen';
import Imgur from '../api/Imgur';
import {StatusBar} from 'react-native';
import ImgurConsts from '../constants/Imgur';

export default class ExploreScreen extends FeedScreen {

  imgur = new Imgur(ImgurConsts.clientId, ImgurConsts.clientSecret);

  showViewOptions = true;

  itemsPerRow = 2;

  async componentDidMount() {
    this.navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });

    this.setQuery({section: 'hot'});
  }

  componentWillUnmount() {
    this.navListener.remove();
  }
};
