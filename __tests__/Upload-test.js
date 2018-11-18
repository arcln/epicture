import 'react-native';
import React from 'react';
import Upload from '../screens/UploadScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('Upload snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the screen', async () => {
    const tree = renderer.create(<Upload />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
