import { Loader } from 'semantic-ui-react';
import { shallow } from 'enzyme';
import React from 'react';

import { MemeList as UnwrappedMemeList } from '../List/MemeList';
import Meme from '../List/Meme';

describe('MemeList', () => {
  const component = shallow(<UnwrappedMemeList/>)
  const meme = {
    id: '1',
    attributes: {
      title: 'aeho',
      url: 'aeho'
    }
  }
  const anotherMeme = {
    ...meme,
    id: '2'
  }
  const createdMeme = {
    ...meme,
    id: '3'
  }
  const props = {
    lastCreated: 0,
    loading: false,
    response: {
      data: [meme]
    }
  }

  it('displays message when no records are found', () => {
    expect(component.find('div').children()).toContain('No records found')
  })

  it('renders a meme list', () => {
    component.setProps(props)
    expect(component.find(Meme).first().props()).toEqual({
      title: 'aeho',
      url: 'aeho'
    })
  })

  it('updates state when fetching next page', () => {
    expect(component.state()).toMatchObject({
      page: 1
    })

    const fetchPage = jest.fn()
    component.instance().fetchPage = fetchPage
    component.instance().fetchNextPage();

    expect(component.state()).toMatchObject({
      page: 2
    })
    expect(fetchPage).toHaveBeenCalledWith(2)
  })

  it('appends next page to the current list', () => {
    expect(component.state()).toMatchObject({
      memes: [meme]
    })

    component.setProps({
      ...props,
      response: {
        data: [anotherMeme]
      }
    })
    expect(component.state()).toMatchObject({
      created: false,
      memes: [meme, anotherMeme]
    })
  })

  it('calls fetchPage when lastCreated count is higher than current', () => {
    expect(component.state()).toMatchObject({
      created: false
    })

    const fetchPage = jest.fn()
    component.instance().fetchPage = fetchPage
    component.setProps({loading: false, lastCreated: 1, response: {}})

    expect(fetchPage).toHaveBeenCalledWith(1,1)
    expect(component.state()).toMatchObject({
      created: true
    })
  })

  it('prepends the first element of the first page when created', () => {
    expect(component.state()).toMatchObject({
      memes: [meme, anotherMeme],
      created: true
    })

    component.setProps({
      lastCreated: 1,
      loading: false,
      response: {
        data: [createdMeme]
      }
    })
    // Even though the order is correct, the Infinite component will render it on the bottom
    expect(component.state()).toMatchObject({
      memes: [createdMeme, meme, anotherMeme],
      created: false
    })
  })
})
