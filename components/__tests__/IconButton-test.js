import {View, Platform} from 'react-native';
import React from 'react';
import IconButton from '../IconButton';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <View>
      <IconButton
        size={100}
        color='#123456'
        name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
      />
      <IconButton
        size={40}
        color='#123456'
        name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
      />
      <IconButton
        size={20}
        color='#123456'
        name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
      />
      <IconButton
        size={10}
        color='#123456'
        name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
      />
      <IconButton
        size={8}
        color='#123456'
        name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
      />
    </View>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
