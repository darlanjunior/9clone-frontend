import React from 'react'
import PropTypes from 'prop-types'
import { api } from './api';

export default ({
  url,
  params = {},
  loadOnMount = true,
  LoadingComponent,
  ErrorComponent
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

      setLoadedState = json => this.setState({
        loading: false,
        response: json
      })

      setErrorState = error => this.setState({
        loading: false,
        error: true,
        response: error
      })

      urlEndpoint = () => this.context.urlEndpoint

      fetchData(aditionalParams={}) {
        this.setState({loading: true})

        return api(`${this.urlEndpoint()||''}${url}`, {...aditionalParams, ...params})
          .then(response => response.json())
          .then(this.setLoadedState.bind(this))
          .catch(this.setErrorState.bind(this))
      }

      render() {
        const { loading, error } = this.state
        const reload = () => this.fetchData()

        if(loading && !!LoadingComponent) return <LoadingComponent {...this.state} {...{reload}} />
        if(error && !!ErrorComponent) return <ErrorComponent {...this.state} {...{reload}} />
        return <Component {...this.state} {...{reload}} />
      }
    }
    API.contextTypes = {
      urlEndpoint: PropTypes.string
    };

    return API
  }
}
