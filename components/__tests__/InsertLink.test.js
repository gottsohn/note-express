import * as React from 'react';
import renderer from 'react-test-renderer';

import { InsertLinkModal } from '../InsertLink';

const props = {
  color: '#111',
  backgroundColor: '#fff',
  placeholderColor: '#777',
  onDone: (url) => url,
};

describe('InsertLinkModal', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<InsertLinkModal {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
