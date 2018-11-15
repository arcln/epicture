import 'react-native';
import React from 'react';
import ImageGrid from '../ImageGrid';
import renderer from 'react-test-renderer';

it('renders correctly empty', () => {
  const tree = renderer.create(
    <ImageGrid
      itemPressed={(_) => null}
      sortOptions={['Popular', 'Trending', 'User Submitted', 'Cancel']}
      disableRowSizeSelect={false}
      onSort={(_) => null}
      data={[]}
      itemsPerRow={3}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly full', () => {
  const tree = renderer.create(
    <ImageGrid
      itemPressed={(_) => null}
      sortOptions={['Popular', 'Trending', 'User Submitted', 'Cancel']}
      disableRowSizeSelect={false}
      onSort={(_) => null}
      data={[
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
        {link: 'https://i.imgur.com/AkRbORU.jpg'},
      ]}
      itemsPerRow={3}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
