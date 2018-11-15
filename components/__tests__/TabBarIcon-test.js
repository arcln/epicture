import {View} from 'react-native';
import React from 'react';
import TabBarIcon from '../TabBarIcon';
import renderer from 'react-test-renderer';

it('renders correctly focused', () => {
  const tree = renderer.create(
    <View style={{paddingTop: 10}}>
      <TabBarIcon
        focused={true}
        name={'ios-arrow-down'}
        size={42}
      />
    </View>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly not focused', () => {
  const tree = renderer.create(
    <View style={{paddingTop: 10}}>
      <TabBarIcon
        focused={false}
        name={'ios-arrow-down'}
        size={42}
      />
    </View>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
