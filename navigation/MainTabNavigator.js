import React from 'react';
import {
  Platform,
  View,
} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MostViralScreen from '../screens/MostViralScreen';
import ImageScreen from '../screens/ImageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserSubmittedScreen from '../screens/UserSubmittedScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const createTabLabel = iconName => ({
  tabBarLabel: ' ',
  tabBarIcon: ({focused}) => (
    <View style={{paddingTop: 10}}>
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`}
      />
    </View>
  ),
});

const MostViralStack = createStackNavigator({
  MostViral: MostViralScreen,
  Image: ImageScreen,
});

MostViralStack.navigationOptions = createTabLabel('trending-up');

const UserSubmittedStack = createStackNavigator({
  UserSubmitted: UserSubmittedScreen,
  Image: ImageScreen,
});

UserSubmittedStack.navigationOptions = createTabLabel('compass');

const UploadStack = createStackNavigator({
  Profile: ProfileScreen,
  // Image: ImageScreen,
});

UploadStack.navigationOptions = createTabLabel('add-circle-outline');

const SearchStack = createStackNavigator({
  Profile: ProfileScreen,
  // Image: ImageScreen,
});

SearchStack.navigationOptions = createTabLabel('search');

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Image: ImageScreen,
});

ProfileStack.navigationOptions = createTabLabel('contact');

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({focused}) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  MostViralStack,
  UserSubmittedStack,
  UploadStack,
  ProfileStack,
  SearchStack,
  // SettingsStack,
});
