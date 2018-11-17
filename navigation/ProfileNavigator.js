import {createDrawerNavigator} from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

export default createDrawerNavigator({
  Profile: {
    screen: ProfileScreen,
  },
  Favorites: {
    screen: FavoritesScreen,
  },
});