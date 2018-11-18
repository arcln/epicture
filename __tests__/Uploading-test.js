import 'react-native';
import React from 'react';
import Uploading from '../screens/UploadingScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Uploading snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Uploading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
