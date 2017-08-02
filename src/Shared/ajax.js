import { Loader } from 'semantic-ui-react'
import React from 'react'

import { api } from './api';

const defaultLoading = <Loader />;
const defaultError = <div>Oh noes</div>;

export default ({
  url,
  params = {},
  loadOnMount = true,
  LoadingComponent = defaultLoading,
  ErrorComponent = defaultError
}) => {
  if(!url) throw new Error('URL is required')

  return Component => class API extends React.Component {

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

    fetchData() {
      this.setState({loading: true})
      const requestParams = params(this.state);

      return api(`http://localhost:3001/${url}`, requestParams)
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
}
