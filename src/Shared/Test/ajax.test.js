import { shallow } from 'enzyme';
import React from 'react';

import ajax from '../ajax';
import * as utils from '../api';

describe('API Higher Order Component', () => {
  const url = '/asdf'
  const params = jest.fn()
  const loadOnMount = true
  const LoadingComponent = () => <div></div>
  const ErrorComponent = () => <div></div>

  beforeEach(() => {
    utils.api = jest.fn().mockImplementation(() =>
      new Promise((resolve) => resolve({
        json: () => { return { a: 'b' } }
      }))
    )
  })

  describe("receives the required params", () => {
    const hoc = (error=true, addParams=false) => ajax({
      url: (error? null : url),
      params: (addParams? params : null),
      loadOnMount,
      LoadingComponent,
      ErrorComponent
    })

    it('returns a function', () => (
      expect(hoc(false, true)).toBeInstanceOf(Function)
    ))
    it('throws when url is missing', () => (
      expect(hoc).toThrow('URL is required')
    ))
    it('does not throw when params are missing', () => (
      expect(() => hoc(false)).not.toThrow('URL is required')
    ))
  })

  describe("calls the api", () => {
    const Child = (props) => <div></div>
    const Component = ajax({
      url,
      params,
      loadOnMount,
      LoadingComponent,
      ErrorComponent
    })(Child)

    const wrapped = shallow(<Component />)
    const state = wrapped.state()
    it(`sets state to loading
mounts loading component
does not render Child`, () => {
      expect(wrapped.state()).toHaveProperty('loading', true)
      expect(wrapped.find(LoadingComponent)).toHaveLength(1)
      expect(wrapped.find(Child)).not.toHaveLength(1)
    })

    it(`calls params as a function passing state,
updates loading, error and response states
hides Loading and shows Child
passes down state and api trigger to Child`, () => (
      wrapped
        .instance()
        .componentDidMount()
        .then(_ => {
          expect(wrapped.find(LoadingComponent)).not.toHaveLength(1)
          expect(wrapped.find(Child)).toHaveLength(1)
          expect(wrapped.find(Child).prop('response')).toEqual({a: 'b'})
          expect(wrapped.find(Child).prop('reload')).toBeInstanceOf(Function)

          expect(params).toHaveBeenCalledWith(state)
          expect(wrapped.state()).toEqual({
            error: false,
            loading: false,
            response: {a: 'b'}
          })
        })
        .catch(err => console.log(err))
    ))
  })
})
