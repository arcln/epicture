import 'react-native';
import React from 'react';
import ImageStats from '../ImageStats';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <ImageStats
      size={42}
      color='#eeffaa'
      data={{
        ups: 1200,
        downs: 200,
        views: 22222200,
      }}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
