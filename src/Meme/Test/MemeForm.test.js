import { mount, shallow } from 'enzyme';
import React from 'react';

import Input from '../../Shared/Input';
import MemeForm from '../Form/MemeForm';

const propCheck = (el, prop, val) => el.prop(prop) === val
const findElemWithPropVal = ({component, elem, prop, val}) => component.findWhere(
  n => n.is(elem) && n.prop(prop) === val
)

describe('MemeForm rendering', () => {
  const component = mount(<MemeForm />)

  it('renders', () => expect(component).toHaveLength(1))

  it('renders input title', () =>
    expect(findElemWithPropVal({
      component,
      elem: Input,
      prop: 'field',
      val: 'title'
    })).toHaveLength(1)
  )

  it('renders input file', () =>
    expect(findElemWithPropVal({
      component,
      elem: Input,
      prop: 'field',
      val: 'file'
    })).toHaveLength(1)
  )

  it('renders submit button', () =>
    expect(findElemWithPropVal({
      component,
      elem: 'button',
      prop: 'type',
      val: 'submit'
    })).toHaveLength(1)
  )
})

describe('MemeForm behavior', () => {
  const mockResponse = response => {
    const promise = new Promise(r => r(response))
    return jest.fn().mockImplementation(() => promise)
  }

  it('calls the api on submit', () => {
    const mock = mockResponse({
      success: true,
      errors: []
    })
    const component = mount(<MemeForm reload={mock} finishCreating={jest.fn()}/>)

    component.find('input[type="text"]').simulate('change', {target: {value: 'title' }})
    component.find('input[type="file"]').simulate('change', {target: {value: 'file' }})
    component.find('form').simulate('submit')

    expect(mock).toHaveBeenCalledWith({
      title: 'title',
      file: 'file'
    }, 'post')
  })

  it('calls the callback after submitting', () => {
    const response = {
      success: true,
      errors: []
    }
    const finishCreating = jest.fn()
    const component = <MemeForm reload={mockResponse(response)} {...{finishCreating}}/>
    const instance = shallow(component).first().shallow().instance() // HOC makes this necessary

    instance.reloadList({}).then(() => {
      expect(finishCreating).toHaveBeenCalled()
    })
  })

})
