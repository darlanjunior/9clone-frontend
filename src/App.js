import { withContext } from 'recompose';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import MemeListPage from './Meme/MemeListPage';

class App extends Component {
  render() {
    return <MemeListPage />;
  }
}

export default withContext({
  urlEndpoint: PropTypes.string
}, () => { return {
  urlEndpoint: 'http://192.168.1.101:3001'
}})(App);
