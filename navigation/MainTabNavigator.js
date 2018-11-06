import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MostViralScreen from '../screens/MostViralScreen';
import ImageScreen from '../screens/ImageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserSubmittedScreen from '../screens/UserSubmittedScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MostViralStack = createStackNavigator({
  MostViral: MostViralScreen,
  Image: ImageScreen,
});

MostViralStack.navigationOptions = {
  tabBarLabel: 'Most Viral',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-trending-up' : 'md-trending-up'
      }
    />
  ),
};

const UserSubmittedStack = createStackNavigator({
  UserSubmitted: UserSubmittedScreen,
  Image: ImageScreen,
});

UserSubmittedStack.navigationOptions = {
  tabBarLabel: 'User Submitted',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Image: ImageScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

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
  ProfileStack,
  // SettingsStack,
});
