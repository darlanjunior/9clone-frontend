import React from 'react'
import PropTypes from 'prop-types'
import { api } from './api';

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
        if(nextState.loading === this.state.loading) // needed because setState triggers update
          return false
        return true
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

        return api(`${this.urlEndpoint()||''}${url}`, {...params, ...aditionalParams})
          .then(this.setLoadedState.bind(this))
          .catch(this.setErrorState.bind(this))
      }

      render() {
        const { loading, error } = this.state
        const reload = (p) => this.fetchData(p)

        if(loading && !!loadingComponent) return loadingComponent
        if(error && !!errorComponent) return errorComponent
        return <Component {...this.state} {...{reload}} />
      }
    }
    API.contextTypes = {
      urlEndpoint: PropTypes.string
    };

    return API
  }
}
