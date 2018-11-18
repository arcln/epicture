import {View} from 'react-native';
import React from 'react';
import Selector from '../Selector';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
      <Selector
        style={{marginRight: 10}}
        options={['Most recent', 'Viral', 'Top']}
        default='Most recent'
        onChange={value => null}
      />
      <Selector
        options={['Today', 'This week', 'This month', 'This year', 'All time']}
        default='All time'
        onChange={value => null}
      />
    </View>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
