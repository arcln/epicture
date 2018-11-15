import 'react-native';
import React from 'react';
import Explore from '../screens/ExploreScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Explore snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Explore />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
