import 'react-native';
import React from 'react';
import Search from '../screens/SearchScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Search snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Search />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
