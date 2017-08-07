import { Card, Image } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import React from 'react';

import Meme from '../List/Meme';

describe('Meme component', () => {
  const component = shallow(
    <Meme url="url" title="title"/>,
    { context: {urlEndpoint: 'endpoint'} }
  )

  it('renders an image composing the endpoint context and url prop', () => {
    expect(component.find(Image).prop('src')).toBe('endpoint/url')
  })
  it('renders the title', () => {
    expect(component.find(Card.Header).children()).toContain('title')
  })
})
