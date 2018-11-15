import 'react-native';
import React from 'react';
import AsyncImage from '../AsyncImage';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <AsyncImage
      source={{uri: 'https://i.imgur.com/AkRbORU.jpg'}}
      width={300}
      style={{width: 300, height: 300}}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
