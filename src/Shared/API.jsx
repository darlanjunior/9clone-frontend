import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class API extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loaded: false,
      error: false,
      response: {}
    }
  }

  componentWillMount() {
    this.fetchData(this.props.url)
  }

  componentWillReceiveProps(props) {
    this.fetchData(props.url)
  }

  fetchData(url) {
    this.setState({loading: true})
    fetch(`http://localhost:3001/${url}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        loading: false,
        loaded: true,
        response: json
      })
    })
    .catch(error => {
      this.setState({
        loading: false,
        loaded: true,
        error: true,
        response: error
      })
    })

  }

  render() {
    const { loading, error, response } = this.state

    if(loading) return (<Loader active inline="centered" />);
    if(error) return (<div>Oh Noes error</div>);

    return React.cloneElement(this.props.children, {
      response: response
    })
  }
}
