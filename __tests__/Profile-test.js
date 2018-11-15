import 'react-native';
import React from 'react';
import Profile from '../screens/ProfileScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Profile snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
