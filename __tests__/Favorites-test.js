import 'react-native';
import React from 'react';
import Favorites from '../screens/FavoritesScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Favorites snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Favorites />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
