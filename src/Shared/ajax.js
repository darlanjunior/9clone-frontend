import React from 'react'
import PropTypes from 'prop-types'
import { api } from './api';
import _ from 'lodash';

export default ({
  url,
  params = {},
  loadOnMount = true,
  loadingComponent,
  errorComponent
}) => {
  if(!url) throw new Error('URL is required')

  return Component => {
    class API extends React.Component {
      state = {
        loading: loadOnMount,
        error: false,
        response: {}
      }

      componentDidMount() {
        if(loadOnMount)
          return this.fetchData()
      }

      shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
      }

      setLoadedState = json => {
        this.setState({
          loading: false,
          response: json
        })

        return json
      }

      setErrorState = error => {
        this.setState({
          loading: false,
          error: true,
          response: error
        })

        return error.response
      }

      urlEndpoint = () => this.context.urlEndpoint

      fetchData(aditionalParams={}, method='get') {
        this.setState({loading: true})

        return api(`${this.urlEndpoint()||''}${url}`, {...params, ...aditionalParams}, method)
          .then(this.setLoadedState.bind(this))
          .catch(this.setErrorState.bind(this))
      }

      render() {
        const { loading, error } = this.state
        const reload = (p, m) => this.fetchData(p, m)

        if(loading && !!loadingComponent) return loadingComponent
        if(error && !!errorComponent) return errorComponent
        return <Component {...this.state} {...{reload}} {...this.props} />
      }
    }
    API.contextTypes = {
      urlEndpoint: PropTypes.string
    };

    return API
  }
}
