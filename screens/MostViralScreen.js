import FeedScreen from './FeedScreen';

export default class MostViralScreen extends FeedScreen {
  componentDidMount() {
    this.props.navigation.setParams({title: 'Most viral'});
  }
};
