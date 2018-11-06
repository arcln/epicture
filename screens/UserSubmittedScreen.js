import FeedScreen from './FeedScreen';

export default class UserSubmittedScreen extends FeedScreen {
  componentDidMount() {
    this.props.navigation.setParams({title: 'User submitted'});
  }
};
