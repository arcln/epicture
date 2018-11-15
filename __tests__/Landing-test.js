import 'react-native';
import React from 'react';
import Landing from '../screens/LandingScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Landing snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Landing />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
