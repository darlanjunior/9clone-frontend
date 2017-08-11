import { BrowserRouter, Route } from 'react-router-dom';
import { withContext } from 'recompose';
import React, { Component } from 'react';

import PropTypes from 'prop-types'

import ForgotPasswordPage from './User/ForgotPasswordPage';
import LoginPage from './User/LoginPage';
import MemeListPage from './Meme/MemeListPage';
import Menu from './Layout/Menu';
import RegisterPage from './User/RegisterPage';
import UpdatePasswordPage from './User/UpdatePasswordPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu onClick={() => this.setState({showForm: true})}/>
          <Route exact path="/" component={MemeListPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/password" component={UpdatePasswordPage} />
          <Route path="/forgot_password" component={ForgotPasswordPage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default withContext({
  urlEndpoint: PropTypes.string
}, () => { return {
  urlEndpoint: 'http://localhost:3001'
}})(App);
